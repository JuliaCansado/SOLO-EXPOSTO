<div class="fluid-row" id="header">
    <div id="column">
        <div class = "blocks">
            <img src='https://github.com/JuliaCansado/SOLO-EXPOSTO/assets/68694598/76706e91-bceb-46ed-82d5-b3702dcea450' height='auto' width='130' align='right'>
        </div>
    </div>
    <h2 class="title toc-ignore">SOLO EXPOSTO: O (IN)DEFINIDO NA REGIÃO METROPOLITANA DE SÃO PAULO </h2>
</div>

        
#### Por Júlia Ascencio Cansado, Orientação de Ana Cecília de Arruda Campos <br> e Coorientação de Mayumi Cursino de Moura Hirye

Repositório para organização do Trabalho Final de Graduação "SOLO EXPOSTO: O (in)definido na Região Metropolitana de São Paulo", que será apresentado dia 11/07/2023 na Faculdade de Arquitetura e Urbanismo da Universidade de São Paulo.
<br>
[Clique aqui para obter acesso ao site do projeto](https://juliacansado.github.io/SOLO-EXPOSTO/index.html)

O solo exposto é raramente foco de investigações sobre as cidades, apesar de se manifestar em diversos processos, espaços e conflitos, definindo transformações e permanências no tecido urbano. Observar as áreas de solo exposto pode revelar diferentes características de seu entorno e representar desafios e possibilidades de cada região. O objetivo deste trabalho é conhecer o solo desprotegido, pensar sobre as áreas de solo exposto na Região Metropolitana de São Paulo, mapear e caracterizá-las através da análise de imagens de satélite e outros materiais cartográficos. 
<br>
<br>
### COMO REPRODUZIR OS MAPAS?
A geração de mapas com possíveis áreas de solo exposto segue o fluxograma abaixo:
![FLUXOGRAMAS](https://github.com/JuliaCansado/SOLO-EXPOSTO/assets/68694598/a97e508a-9357-4b2a-95fb-9e32a0fbd902)


É possível acessar os códigos e rodá-los diretamente pelo Google Earth Engine ou acessar os scripts pelo GitHub através da tabela abaixo. **Atenção - Os polígonos para geração de amostras só estão disponíveis na plataforma GEE.**
| CÓDIGO | LINK PARA GOOGLE EARTH ENGINE | LINK PARA ARQUIVO NO GITHUB|
|:------:|:-----------------------------:|:--------------------------:|
|**CÓDIGO 01 - CLASSIFICAÇÃO SOLO EXPOSTO CLARO** | [`01_classificacao_claro - Google Earth Engine`](https://code.earthengine.google.com/0531cc88bf63fb2d0fb9754ebf9e3d5f)|[`01_classificacao_claro - GitHub`](https://code.earthengine.google.com/a7b9e74e5e18b9288bc0f64f518b6548) |
|**CÓDIGO 02 - CLASSIFICAÇÃO SOLO EXPOSTO ESCURO**| [`02_classificacao_escuro - Google Earth Engine`](https://code.earthengine.google.com/a7b9e74e5e18b9288bc0f64f518b6548)|[`02_classificacao_escuro - GitHub`](https://code.earthengine.google.com/a7b9e74e5e18b9288bc0f64f518b6548)|
|**CÓDIGO 03 - JUNÇÃO DAS IMAGENS**| [`03_juncao_imagens - Google Earth Engine`](https://code.earthengine.google.com/ce3c7eb4a7e3adf794b0df86f86c23c1)| [`03_juncao_imagens - GitHub`](https://code.earthengine.google.com/ce3c7eb4a7e3adf794b0df86f86c23c1)|
|**CÓDIGO 04 - REMOÇÃO E VETORIZAÇÃO DE ÁREAS**| [`04_remocao_vetorizacao - Google Earth Engine`](https://code.earthengine.google.com/36e9340e970e3cd7c082fce29ca6c3fb)|[`04_remocao_vetorizacao - GitHub`](https://code.earthengine.google.com/36e9340e970e3cd7c082fce29ca6c3fb)|
|**CÓDIGO 05 - INCLUSÃO DE PROPRIEDADES E CORREÇÕES**| [`05_inclusao_propriedades - Google Earth Engine`](https://code.earthengine.google.com/f48eae8cc0f3fb69df3c1e01c074d599)|[`05_inclusao_propriedades - GitHub`](https://code.earthengine.google.com/f48eae8cc0f3fb69df3c1e01c074d599)|

#### PRIMEIRO PASSO - CLASSIFICAÇÃO SOLO EXPOSTO CLARO











