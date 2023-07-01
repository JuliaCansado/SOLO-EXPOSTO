//---------------------------------------------------------------------------------------

// 03_JUNÇÃO - SOLO EXPOSTO: O (in)definido na Região Metropolitana de São Paulo

// DESCRIÇÃO: Código de junção das classificações de áreas de solo exposto claro e escuro para 2022.
// AUTORES: Júlia Cansado sob orientação de Ana Cecília Campos e Mayumi Hirye 
// CONTATO: julia.cansado@usp.br

//---------------------------------------------------------------------------------------



// INPUTS
// Geometria da RMSP e bounding box RMSP
var RMSP_box = ee.FeatureCollection('users/juliacansado/TFG/BASES/MUN_RMSP').geometry().bounds().buffer(15000);
var RMSP = ee.FeatureCollection('users/juliacansado/TFG/BASES/MUN_RMSP');
 
// Definição ano
var year = 2022;
 
 
// VISUALIZAÇÃO DOS MOSAICOS
// Coleção Planet no GEE Data Catalog
var planetImageMosaic = ee.ImageCollection("projects/planet-nicfi/assets/basemaps/americas");

// Filtro das imagens por período
var planetFilt_2022 = planetImageMosaic.filter(ee.Filter.date('2022-06-01', '2022-11-30'))
                            .median().clip(RMSP_box);
var imageVisParamPlanet = {"opacity":1,"bands":["R","G","B"],"min":-124.90109682345337,"max":1492.1354718234534,"gamma":1};
Map.addLayer(planetFilt_2022,imageVisParamPlanet,'planet - 2022');



// VISUALIZAÇÃO DE PROBABILIDADE
// Parâmetros de visualização de probabilidade
var prob_intervals =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#264653" quantity="0.65" label="0-50"/>' + // azul
      '<ColorMapEntry color="#2a9d8f" quantity="0.75" label="50-75" />' + // verde
      '<ColorMapEntry color="#e9c46a" quantity="0.85" label="75-85" />' + // amarelo
      '<ColorMapEntry color="#f4a261" quantity="0.90" label="85-90" />' + // laranja
      '<ColorMapEntry color="#e76f51" quantity="1" label="97-100" />' + //vermelho
    '</ColorMap>' +
  '</RasterSymbolizer>';

Map.addLayer(planet_2022.sldStyle(prob_intervals),{},'baresoil - Planet');
Map.addLayer(planet_OA_2022.sldStyle(prob_intervals),{},'baresoil - Planet OA');



// CÁLCULO DE ÁREA POR MANCHA DE SOLO EXPOSTO
// Classificação solo exposto claro
var planetImage = planet_2022;
// Classificação solo exposto escuro
var planetImage_OA = planet_OA_2022;

// OPERAÇÕES COM IMAGEM DE SOLO EXPOSTO CLARO
// Atribuir ID a pixels conectados
var objectId_planet = planetImage.gte(0.75).connectedComponents({
  connectedness: ee.Kernel.plus(1),
  maxSize: 1024
});

// Calcular a quantidade de pixels selecionados
var objectSize_planet = objectId_planet.select('labels')
  .connectedPixelCount({
    maxSize: 1024, eightConnected: false
  });

// Geração de imagem que contém informação de área nos pixels
var pixelArea = ee.Image.pixelArea();

// Multiplicação da imagem gerada com as manchas de solo exposto
var objectArea_planet = objectSize_planet.multiply(pixelArea);

// Filtro para divisão de áreas de solo exposto menores e maiores à 3000 m²
var areaMask_planet_lt = objectArea_planet.lt(3000);
var areaMask_planet_gte = objectArea_planet.gte(3000);

// Atualização da máscara - geração de imagens com manchas menores e maiores à 3000 m²
var objectId_planet_lt3 = planetImage.updateMask(areaMask_planet_lt3);
var objectId_planet_gte3 = planetImage.updateMask(areaMask_planet_gte3);



// OPERAÇÕES COM IMAGEM DE SOLO EXPOSTO ESCURO
// Atribuir ID a pixels conectados
var objectId_planet_OA = planetImage_OA.gte(0.75).connectedComponents({
  connectedness: ee.Kernel.plus(1),
  maxSize: 1024
});

// Calcular a quantidade de pixels selecionados
var objectSize_planet_OA = objectId_planet_OA.select('labels')
  .connectedPixelCount({
    maxSize: 1024, eightConnected: false
  });

// Geração de imagem que contém informação de área nos pixels
var pixelArea = ee.Image.pixelArea();

// Multiplicação da imagem gerada com as manchas de solo exposto
var objectArea_planet_OA = objectSize_planet_OA.multiply(pixelArea);

// Filtro para obtenção de áreas de solo exposto maiores ou iguais à 500 m²
var areaMask_planet_OA = objectArea_planet_OA.gte(500);

// Atualização da máscara - geração de imagem com manchas maiores ou iguais à 500 m²
objectId_planet_OA = planetImage_OA.updateMask(areaMask_planet_OA);



// APLICAÇÃO DE MÁSCARAS / JUNÇÃO DOS RESULTADOS
// Filtro de pixels com probabilidade maior ou igual a 75% de corresponder a solo exposto escuro
var probabilidade = planetImage_OA.gte(0.75);

// Exclusão de áreas de solo exposto inferiores a 3000 m² de solo exposto claro não identificadas no modelo de solo exposto escuro
var mascara1 = objectId_planet_lt3.updateMask(probabilidade);

// Junção das imagens - mascara1, áreas de solo exposto claro maiores do que 3000 m², áreas de solo exposto escuro
var juncao = ee.ImageCollection([mascara1,objectId_planet_gte3,objectId_planet_OA]);
juncao = juncao.mosaic();
Map.addLayer(juncao,{palette:'#18ffec'},'mask4');

// Exportação imagem final
Export.image.toAsset({
        image:juncao,
        description: 'planet_' + year + '_ADD',
        assetId: 'users/juliacansado/TFG/PROMISSORES/planet_' + year + '_ADD_4',
        region: RMSP_box,
        scale: 4,
        maxPixels: 1700000000
});



