# Script Python que consome a API C++

import json
import urllib.request
import urllib.error

BASE_URL = "http://127.0.0.1:8080"

def testar_saude():
    print("-> Testando GET /api/saude...")
    try:
        with urllib.request.urlopen(f"{BASE_URL}/api/saude", timeout=2) as resp:
            dados = json.loads(resp.read().decode())
            print("Status C++:", dados)
    except urllib.error.URLError as e:
        print("[ERRO] Servidor C++ não encontrado. Ele está rodando?", e)

def testar_avaliacao():
    print("\n-> Testando POST /api/avaliar...")
    payload = json.dumps({
        "fala": "Olá Maria, quando começou essa dor e você teve febre?",
        "criterios_anteriores": []
    }).encode("utf-8")

    req = urllib.request.Request(
        f"{BASE_URL}/api/avaliar",
        data=payload,
        headers={"Content-Type": "application/json"}
    )

    try:
        with urllib.request.urlopen(req, timeout=2) as resp:
            resultado = json.loads(resp.read().decode())
            print("Resposta do C++:", json.dumps(resultado, indent=2, ensure_ascii=False))
    except urllib.error.URLError as e:
        print("[ERRO] Falha ao enviar requisição para C++:", e)

if __name__ == "__main__":
    testar_saude()
    testar_avaliacao()