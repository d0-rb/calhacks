import mysql.connector

# Establish a connection to the MySQL database

def get_calendar():
    res = []
    mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="iD#234481"
    )

    try:
        # Create a cursor object
        cursor = mydb.cursor()

        # Execute a SQL query
        cursor.execute("SELECT * FROM mysql.events_simp")

        # Fetch the query results
        rows = cursor.fetchall()
        for row in rows:
            res.append(row)
        return res

    except mysql.connector.Error as e:
        return f"Error: {str(e)}"

    finally:
        # Close the database connection
        mydb.close()

print(len(get_calendar()))