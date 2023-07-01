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



É possível acessar os códigos e rodá-los diretamente pelo Google Earth Engine ou acessar os scripts pelo GitHub através da tabela abaixo. **Atenção - Os scripts de mapeamento estão no branch "mapeamento" e o código desenvolvido para a interface está no branch "interface".**
| CÓDIGO | LINK PARA GOOGLE EARTH ENGINE | LINK PARA ARQUIVO NO GITHUB|
|:------:|:-----------------------------:|:--------------------------:|
|**CÓDIGO 01 - CLASSIFICAÇÃO SOLO EXPOSTO CLARO** | [`01_classificacao_claro - Google Earth Engine`](https://code.earthengine.google.com/0531cc88bf63fb2d0fb9754ebf9e3d5f)|[`01_classificacao_claro - GitHub`](https://github.com/JuliaCansado/SOLO-EXPOSTO/blob/main/c%C3%B3digos/01_classificacao_claro) |
|**CÓDIGO 02 - CLASSIFICAÇÃO SOLO EXPOSTO ESCURO**| [`02_classificacao_escuro - Google Earth Engine`](https://code.earthengine.google.com/a7b9e74e5e18b9288bc0f64f518b6548)|[`02_classificacao_escuro - GitHub`](https://github.com/JuliaCansado/SOLO-EXPOSTO/blob/main/c%C3%B3digos/02_classificacao_escuro)|
|**CÓDIGO 03 - JUNÇÃO DAS IMAGENS**| [`03_juncao_imagens - Google Earth Engine`](https://code.earthengine.google.com/ce3c7eb4a7e3adf794b0df86f86c23c1)| [`03_juncao_imagens - GitHub`](https://github.com/JuliaCansado/SOLO-EXPOSTO/blob/main/c%C3%B3digos/03_juncao_imagens)|
|**CÓDIGO 04 - REMOÇÃO E VETORIZAÇÃO DE ÁREAS**| [`04_remocao_vetorizacao - Google Earth Engine`](https://code.earthengine.google.com/36e9340e970e3cd7c082fce29ca6c3fb)|[`04_remocao_vetorizacao - GitHub`](https://github.com/JuliaCansado/SOLO-EXPOSTO/blob/main/c%C3%B3digos/04_remocao_vetorizacao)|
|**CÓDIGO 05 - INCLUSÃO DE PROPRIEDADES E CORREÇÕES**| [`05_inclusao_propriedades - Google Earth Engine`](https://code.earthengine.google.com/f48eae8cc0f3fb69df3c1e01c074d599)|[`05_inclusao_propriedades - GitHub`](https://github.com/JuliaCansado/SOLO-EXPOSTO/blob/main/c%C3%B3digos/05_inclusao_propriedades)|

<br>

#### 1) PRIMEIRO PASSO - CÓDIGO 01 E 02
Primeiramente foram elaborados mosaicos, junções de diferentes imagens para seleção de pixels representativos de um período específico (no caso deste estudo período chuvoso e seco do ano), para os anos de 2017 a 2022 das imagens Landsat, Sentinel e Planet. A partir dos mosaicos, foram calculados diferentes de índices a partir das bandas disponíveis, como o Índice de Vegetação com Diferença Normalizada (NDVI), o Índice de Diferença Normalizada de Áreas Construídas (NDBI) e o Índice de Solo Exposto (Bare Soil Index - BSI). As imagens finais classificadas correspondem ao período seco do ano (entre 01 de junho e 30 de novembro de cada ano).
A partir dos mosaicos com índices, foram delimitados manualmente polígonos correspondentes a dados de Nível I da biblioteca espectral de materiais urbanos, definidas como “áreas construídas, vegetação, áreas não-urbanas de solo exposto e corpos d’água” (Herold et al., 2004 apud Hirye, 2014), agrupados em “áreas de solo exposto” e “áreas de não-solo exposto”.
<br>

Durante o estudo foram identificadas 2 tonalidades principais de solo exposto, portanto, foram elaborados e aplicados 2 modelos de mapeamento dessas áreas: um focando em áreas de solo exposto “claro” e o outro em áreas de solo exposto “escuro”.

<br>

![Diferentes tons de solo exposto](https://github.com/JuliaCansado/SOLO-EXPOSTO/assets/68694598/8974da24-54ca-4ffe-90cf-39d0e318b23e)
**Exemplos de solo exposto claro e solo exposto escuro.**

<br>
<br>

Para cada modelo, foram gerados polígonos distintos e dentro desses polígonos foram geradas 400 amostras de solo exposto e 1200 amostras de não-solo exposto, as quais tiveram as classes correspondentes atribuídas e foram divididas entre amostras de treinamento e validação (respectivamente 70% e 30% das amostras totais). As amostras de treinamento foram utilizadas no mosaico para gerar uma classificação de probabilidade a partir do algoritmo aprendizado de máquina “Random Forest”.
<br>

Inicialmente, foram feitos esses testes de classificação para as três fontes de imagens apresentadas, entretanto, por conta da maior resolução espacial da Planet (4,77 m), as áreas de solo exposto ficaram melhor delimitadas nos mapas gerados a partir destas imagens e os produtos subsequentes foram desenvolvidos a partir delas.

<br>

#### 2) SEGUNDO PASSO - CÓDIGO 03
Após a classificação, foram consideradas possíveis áreas de solo exposto apenas aquelas que possuíssem mais de 75% de probabilidade de serem dessa classe e as amostras de validação foram utilizadas nesse resultado para medição de uma acurácia inicial. Os modelos gerados para áreas de solos “escuros” possuem, em geral, uma acurácia menor, apesar de visualmente apresentarem menos confusão: ao não detectar tantas áreas de solo exposto “claro”, também classificam menos áreas construídas como solo exposto, principalmente telhados mais reflexivos e telhas cerâmicas.
<br>

Nesse sentido, para a junção dos dois modelos foram calculadas as áreas de cada mancha classificada como solo exposto e as manchas com menos de 3000 m² do modelo “claro” foram eliminadas caso não fossem também identificadas pelo modelo “escuro”, buscando eliminar telhados e construções que foram classificadas erroneamente.


<br>

#### 3) TERCEIRO PASSO - CÓDIGO 04 E 05

Em seguida, algumas áreas específicas onde havia maior confusão do modelo foram retiradas manualmente e cada mancha foi transformada em vetor, para conseguirmos atribuir informações específicas ao polígono correspondente, como sua área e município, distrito ou subprefeitura onde se localiza. 
<br>

Aqui foram geradas novas amostras de validação para o cálculo de acurácia final dos mapas, comparando com os números obtidos na primeira etapa (classificação) através da análise de suas matrizes de erros, que descrevem a exatidão de cada categoria com os erros de inclusão (comissão) e exclusão (omissão) cometidos no mapeamento (CONGALTON, 1991).

<br>

### APLICANDO EM OUTRAS ÁREAS / ANOS
Será preciso criar novos polígonos para extração de amostras e novos mosaicos, na região e ano de interesse.
- Inserir nova geometria nos inputs - delimitando área a ser processada
- Gerar novos polígonos de solo exposto e não-solo exposto através da ferramenta de desenho do GEE


