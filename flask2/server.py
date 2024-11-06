# -*- coding: utf-8 -*-
from flask import Flask, send_file, make_response, render_template, request, redirect, url_for, jsonify
import mysql.connector
from mysql.connector import Error
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

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
            
            
@app.route('/tablas', methods=["POST"])
def obtener_tablas():
    data = request.json
    h = data.get('host')
    u = data.get('user')
    p = data.get('pass')
    db = data.get('db')

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
            cursor = conexiondatos.cursor()
            cursor.execute("SHOW TABLES")
            tablas = cursor.fetchall()
            # Extraer solo el nombre de las tablas
            tablas = [tabla[0] for tabla in tablas]
            return jsonify({"tablas": tablas}), 200

    except Error as err:
        return jsonify({"error": f"Error de conexión: {err}"}), 500
    
    finally:
        if conexiondatos and conexiondatos.is_connected():
            cursor.close()
            conexiondatos.close()
            
@app.route('/columnas', methods=["POST"])
def obtener_columnas():
    data = request.json
    h = data.get('host')
    u = data.get('user')
    p = data.get('pass')
    db = data.get('db')
    tabla = data.get('tabla')

    # Verificar si se han proporcionado todos los valores necesarios
    if not all([h, u, p, db, tabla]):
        return jsonify({"error": "Todos los campos de conexión y el nombre de la tabla deben ser proporcionados"}), 400

    conexiondatos = None
    try:
        conexiondatos = mysql.connector.connect(
            host=h,
            user=u,
            password=p,
            database=db,
        )

        if conexiondatos.is_connected():
            cursor = conexiondatos.cursor()
            query = f"SHOW COLUMNS FROM {tabla}"
            cursor.execute(query)
            columnas = cursor.fetchall()
            # Extraer solo los nombres de las columnas
            columnas = [columna[0] for columna in columnas]
            return jsonify({"columnas": columnas}), 200

    except Error as err:
        return jsonify({"error": f"Error de conexión: {err}"}), 500
    
    finally:
        if conexiondatos and conexiondatos.is_connected():
            cursor.close()
            conexiondatos.close()



@app.route('/datos_seleccionados', methods=["POST"])
def obtener_todo2():
    data = request.json
    h = data.get('host')
    u = data.get('user')
    p = data.get('pass')
    db = data.get('db')
    tablas = data.get('tablas')
    columnas_seleccionadas = data.get('columnasSeleccionadas')

    # Verificar si se han proporcionado todos los valores necesarios
    if not all([h, u, p, db, tablas, columnas_seleccionadas]):
        return jsonify({"error": "Todos los campos deben ser proporcionados"}), 400

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
                columnas = columnas_seleccionadas.get(tabla, {})
                if 'x' not in columnas or 'y' not in columnas:
                    return jsonify({"error": f"No se han seleccionado columnas para la tabla {tabla}"}), 400
                
                col_x = columnas['x']
                col_y = columnas['y']
                
                query = f"SELECT {col_x}, {col_y} FROM {tabla}"
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
            


if __name__ == '__main__':
    
    app.run(host="0.0.0.0", port=80)