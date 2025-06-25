from flask import Flask, jsonify, render_template, request
import json

app = Flask(__name__)

ARQ_ALUNOS = 'alunos.json'

def ler_alunos():
    with open(ARQ_ALUNOS, 'r', encoding='utf-8') as f:
        return json.load(f)

def salvar_alunos(alunos):
    with open(ARQ_ALUNOS, 'w', encoding='utf-8') as f:
        json.dump(alunos, f, indent=2, ensure_ascii=False)

@app.route('/')
def home():
    return render_template("listar_alunos.html")

@app.route('/api/alunos', methods=['GET'])
def listar_alunos():
    alunos = ler_alunos()
    return jsonify(alunos)

@app.route('/api/alunos', methods=['POST'])
def criar_aluno():
    dados = request.json
    alunos = ler_alunos()

    novo_id = max([a['id'] for a in alunos], default=0) + 1
    aluno_novo = {
        "id": novo_id,
        "nome": dados.get('nome'),
        "curso": dados.get('curso'),
        "IRA": dados.get('IRA')
    }
    alunos.append(aluno_novo)
    salvar_alunos(alunos)
    return jsonify(aluno_novo), 201

@app.route('/api/alunos/<int:id>', methods=['PUT'])
def editar_aluno(id):
    dados = request.json
    alunos = ler_alunos()
    for aluno in alunos:
        if aluno['id'] == id:
            aluno['nome'] = dados.get('nome', aluno['nome'])
            aluno['curso'] = dados.get('curso', aluno['curso'])
            aluno['IRA'] = dados.get('IRA', aluno['IRA'])
            salvar_alunos(alunos)
            return jsonify(aluno)
    return jsonify({'erro': 'Aluno não encontrado'}), 404

@app.route('/api/alunos/<int:id>', methods=['DELETE'])
def apagar_aluno(id):
    alunos = ler_alunos()
    alunos_filtrados = [a for a in alunos if a['id'] != id]
    if len(alunos_filtrados) == len(alunos):
        return jsonify({'erro': 'Aluno não encontrado'}), 404
    salvar_alunos(alunos_filtrados)
    return jsonify({'msg': 'Aluno apagado com sucesso'}), 200

if __name__ == "__main__":
    app.run(debug=True)
