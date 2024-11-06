# -*- coding: utf-8 -*-
from flask import Flask, send_file, make_response, render_template, request, redirect, url_for, jsonify
from flask_cors import CORS
from google.cloud import pubsub_v1
import os
import mysql.connector
from mysql.connector import Error
from datetime import datetime


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/', methods=["GET"])
def redirect_blockly():
    return redirect("Interfaz.html")


@app.route('/datos', methods=["POST"])
def obtener_todo():
    data = request.json
    h = data.get('host')
    u = data.get('user')
    p = data.get('pass')
    db = data.get('db')
    tablas = data.get('tablas', ['temperatura', 'humedad', 'viento'])

    # Verificar si se han proporcionado todos los valores necesarios
    if not all([h, u, p, db]):
        return jsonify({"error": "Todos los campos de conexión deben ser proporcionados"}), 400

    conexiondatos = None
    try:
        conexiondatos = mysql.connector.connect(
            host=h,
            user=u,
            password=p,
            database=db,
        )
        
        if conexiondatos.is_connected():
            cursor = conexiondatos.cursor(dictionary=True)
            datos = {}
            for tabla in tablas:
                query = f"SELECT * FROM {tabla} ORDER BY id DESC"
                cursor.execute(query)
                resultados = cursor.fetchall()
                datos[tabla] = resultados

            return jsonify(datos), 200

    except Error as err:
        return jsonify({"error": f"Error de conexión: {err}"}), 500
    
    finally:
        if conexiondatos and conexiondatos.is_connected():
            cursor.close()
            conexiondatos.close()

# ! Funcionando

@app.route('/conexion_select', methods=["GET"])
def conexion_select():
    h = request.args.get('host')
    u = request.args.get('user')
    p = request.args.get('pass')
    db = request.args.get('db')
    tabla = request.args.get('tabla')
    parametro = request.args.get('parametro')

    # Verificar si se han proporcionado todos los valores necesarios
    if not all([h, u, p, db, tabla]):
        return "Error: Todos los campos de conexión deben ser proporcionados", 400

    try:
        conexion1 = mysql.connector.connect(
            host=h,
            user=u,
            password=p,
            database=db,
            use_pure=True
        )
        
        if conexion1.is_connected():
            cursor = conexion1.cursor(dictionary=True)
            # Consulta SQL para obtener el registro con el ID más alto
            query = f"SELECT {parametro} FROM {tabla} ORDER BY id DESC LIMIT 1"
            cursor.execute(query)
            result = cursor.fetchone()  # Obtener el primer registro del resultado
            
            # Verificar si se obtuvo algún resultado
            if result:
                return jsonify(result), 200
            else:
                return "No se encontraron registros.", 404

    except Error as err:
        return f"Error de conexión: {err}", 500
    finally:
        if conexion1.is_connected():
            cursor.close()
            conexion1.close()
            
# ! Funcionando
            
            
@app.route('/conexion_insert', methods=["GET"])
def conexion_insert():
    # Obtener parámetros de la solicitud GET
    h = request.args.get('host')
    u = request.args.get('user')
    p = request.args.get('pass')
    db = request.args.get('db')
    tabla = request.args.get('tabla')

    if not all([h, u, p, db, tabla]):
        return "Error: Todos los campos de conexión y datos deben ser proporcionados", 400

    # Obtener los campos y valores como parámetros
    campos = [key for key in request.args.keys() if key not in {'host', 'user', 'pass', 'db', 'tabla'}]
    valores = [request.args.get(key) for key in campos]

    if not campos or not valores or len(campos) != len(valores):
        return "Error: Los campos y valores deben ser proporcionados y deben coincidir en cantidad", 400

    try:
        # Conectar a la base de datos
        conexion1 = mysql.connector.connect(
            host=h,
            user=u,
            password=p,
            database=db,
            use_pure=True
        )

        if conexion1.is_connected():
            cursor = conexion1.cursor()

            # Generar el placeholder para los valores
            placeholders = ', '.join(['%s'] * len(campos))
            query = f"INSERT INTO {tabla} ({', '.join(campos)}) VALUES ({placeholders})"

            # Ejecutar la consulta
            cursor.execute(query, tuple(valores))
            conexion1.commit()
            return jsonify({"message": "Registros insertados correctamente", "query": query}), 201

    except Error as err:
        return f"Error de conexión: {err}", 500

    finally:
        if conexion1.is_connected():
            cursor.close()
            conexion1.close()



@app.route('/conexion_insert_cualquiera', methods=["GET"])
def conexion_2():
    h = request.args.get('host')
    u = request.args.get('user')
    p = request.args.get('pass')
    db = request.args.get('db')
    tabla = request.args.get('tabla')
    temperatura = request.args.get('temperatura')

    if not all([h, u, p, db, tabla, temperatura]):
        return "Error: Todos los campos de conexión deben ser proporcionados", 400

    try:
        conexion1 = mysql.connector.connect(
            host=h,
            user=u,
            password=p,
            database=db,
            use_pure=True
        )
        
        if conexion1.is_connected():
            cursor = conexion1.cursor(dictionary=True)
            fecha_actual = datetime.now().strftime('%Y-%m-%d')
            query = f"INSERT INTO {tabla} (valor,fecha) VALUES (%s,%s)"
            values = (temperatura,fecha_actual)
            cursor.execute(query, values)  
            conexion1.commit()
            
            return jsonify({"message": "Registro insertado correctamente"}), 201

    except Error as err:
        return f"Error de conexion: {err}", 500
    
    finally:
        if conexion1.is_connected():
            cursor.close()
            conexion1.close()


@app.route('/blockly', methods=["GET"])
def default():
    return redirect("blockly/apps/blocklyduino/index.html", code=302)

@app.route("/<path:path>", methods=["GET"])
def doGet(path):
    path = app.root_path + "/" + app.template_folder + "/" + path
    response = make_response(send_file(path))
    return response


if __name__ == '__main__':
    
    app.run(host="0.0.0.0", port=8080)
