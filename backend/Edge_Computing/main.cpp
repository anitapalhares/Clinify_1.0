/*Servidor HTTP*/

#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

// Headers que você baixará na pasta edge/
#include "httplib.h"
#include "json.hpp"

using json = nlohmann::json;

// Estrutura de critério clínico
struct Criterio {
    std::string nome;
    std::vector<std::string> termos;
    std::string feedback;
};

int main() {
    httplib::Server svr;

    // Regras clínicas mapeadas
    const std::vector<Criterio> CRITERIOS = {
        {"acolhimento", {"ola", "bom dia", "entendo", "compreendo"}, "Boa abertura com comunicação empática."},
        {"anamnese", {"quando", "inicio", "duracao", "dor", "historia"}, "Investigou o histórico e características da queixa."},
        {"sinais de alerta", {"febre", "rigidez", "visao", "desmaio", "subita"}, "Atenção adequada aos sinais de alerta graves."},
        {"seguranca", {"exame", "supervisao", "retorno", "emergencia"}, "Considerou plano seguro e encaminhamento supervisionado."}
    };

    // 1. Rota de Health Check
    svr.Get("/api/saude", [](const httplib::Request&, httplib::Response& res) {
        json payload = {
            {"servico", "Clinify Edge C++"},
            {"status", "online"},
            {"porta", 8080}
        };
        res.set_content(payload.dump(2), "application/json");
    });

    // 2. Rota de Avaliação Clínica
    svr.Post("/api/avaliar", [&](const httplib::Request& req, httplib::Response& res) {
        try {
            auto body = json::parse(req.body);
            std::string fala = body.value("fala", "");
            std::vector<std::string> anteriores = body.value("criterios_anteriores", std::vector<std::string>{});

            // Normaliza para minúsculas
            std::string fala_min = fala;
            std::transform(fala_min.begin(), fala_min.end(), fala_min.begin(), ::tolower);

            std::vector<std::string> novos;
            std::string feedback_acumulado = "";

            for (const auto& c : CRITERIOS) {
                // Não pontua se o critério já foi alcançado na simulação
                if (std::find(anteriores.begin(), anteriores.end(), c.nome) != anteriores.end()) {
                    continue;
                }

                for (const auto& termo : c.termos) {
                    if (fala_min.find(termo) != std::string::npos) {
                        novos.push_back(c.nome);
                        if (!feedback_acumulado.empty()) feedback_acumulado += " ";
                        feedback_acumulado += c.feedback;
                        break;
                    }
                }
            }

            if (novos.empty()) {
                feedback_acumulado = "Resposta registrada. Continue aprofundando o exame clínico e conduta.";
            }

            json resposta = {
                {"novos_criterios", novos},
                {"ganho_pontos", static_cast<int>(std::min(18, static_cast<int>(novos.size()) * 9))},
                {"feedback", feedback_acumulado}
            };

            res.set_content(resposta.dump(2), "application/json");
        } catch (...) {
            res.status = 400;
            res.set_content("{\"erro\": \"JSON invalido no corpo da requisicao\"}", "application/json");
        }
    });

    std::cout << "Servidor C++ rodando em http://127.0.0.1:8080" << std::endl;
    svr.listen("127.0.0.1", 8080);

    return 0;
}