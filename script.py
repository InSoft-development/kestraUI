from flask import Flask, request
import argparse
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route("/")
def hello():
   return '<h2>Hello</h2>'

@app.route("/change")
def change():
  path = request.args.get('kestra_api')
  print(path)
  with open('data/config/config.js', 'w') as file:
    file.write("const url = '" + path + "'\nexport {" + "url };")
# обработка файла...

def parse_args():
    parser = argparse.ArgumentParser(description="start flask + vue 3 web-application")
    parser.add_argument("-ip", "--host", type=str, help="specify IPv4 address of host", default='localhost')
    parser.add_argument("-p", "--port", type=int, help="specify port")
    return parser.parse_args()


if __name__ == '__main__':
    try:
        args = parse_args()
    except SystemExit:
        exit(0)
    app.run(host=args.host, port=args.port)