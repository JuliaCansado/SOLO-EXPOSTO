//---------------------------------------------------------------------------------------

// 04_REMOÇÃO E VETORIZAÇÃO - SOLO EXPOSTO: O (in)definido na Região Metropolitana de São Paulo

// DESCRIÇÃO: Código de remoção de áreas específicas e vetorização de áreas de solo exposto para 2022.
// AUTORES: Júlia Cansado sob orientação de Ana Cecília Campos e Mayumi Hirye 
// CONTATO: julia.cansado@usp.br

//---------------------------------------------------------------------------------------



// INPUTS
// Geometria da RMSP e bounding box RMSP
var RMSP_box = ee.FeatureCollection('users/juliacansado/TFG/BASES/MUN_RMSP').geometry().bounds().buffer(15000);
var RMSP = ee.FeatureCollection('users/juliacansado/TFG/BASES/MUN_RMSP');

// VISUALIZAÇÃO DOS MOSAICOS
// Coleção Planet no GEE Data Catalog
var planetImageMosaic = ee.ImageCollection("projects/planet-nicfi/assets/basemaps/americas");

// Filtro das imagens por período
var planetFilt_2022 = planetImageMosaic.filter(ee.Filter.date('2022-0-01', '2022-11-30'))
                            .median().clip(RMSP_box);
var imageVisParamPlanet = {"opacity":1,"bands":["R","G","B"],"min":-124.9010982345337,"max":1492.1354718234534,"gamma":1};
Map.addLayer(planetFilt_2022,imageVisParamPlanet,'planet - 2022');



// CONVERSÃO DA IMAGEM PARA UMA 32-bit INTEGER
var imageADD = planet_2022_ADD.toInt32();

// Geração de imagem que contém informação de área nos pixels
var pixelArea = ee.Image.pixelArea();



// FILTRO DE ÁREAS 
// Atribuir ID a pixels conectados
var objectId_planet = imageADD.connectedComponents({
  connectedness: ee.Kernel.plus(1),
  maxSize: 1024
});

// Calcular a quantidade de pixels selecionados
var objectSize_planet = objectId_planet.select('labels')
  .connectedPixelCount({
    maxSize: 1024, eightConnected: false
  });

// Multiplicação da imagem gerada com as manchas de solo exposto
var objectArea_planet = objectSize_planet.multiply(pixelArea);

// Filtro para divisão de áreas de solo exposto menores e maiores à 500 m²
var areaMask_planet_lt = objectArea_planet.lt(500);
var areaMask_planet_gte = objectArea_planet.gte(500);

// Atualização da máscara - geração de imagens com manchas maiores à 500 m²
var objectId_planet_gte = imageADD.updateMask(areaMask_planet_gte);
var classification = objectId_planet_gte.neq(0).add(1).unmask();
Map.addLayer(classification, {}, 'Solo > 500 - planet 2022');
//print(classification);



// REMOÇÃO MANUAL DE ÁREAS / POLÍGONOS
// Geração de imagem de valor constante 0
var zeroImage = ee.Image(0);

// Renomear banda para 'classification'
zeroImage = zeroImage.clip(REMOVE).select(['constant'],['classification']);

// Criar nove imagem de classificação, sem as áreas a serem removidas
classification = ee.ImageCollection([classification,zeroImage]).mosaic();



// GERAR PONTOS DE AMOSTRAS DENTRO DOS POLÍGONOS DESENHADOS PARA NOVA ACURÁCIA
// Pontos não-solo exposto
var notbareFC_2022 = ee.FeatureCollection.randomPoints({
  region: notbare_2022,
  points: 450,
  seed: 24
});

// Pontos solo exposto
var bareFC_2022 = ee.FeatureCollection.randomPoints({
  region: bare_2022,
  points: 225,
  seed: 24
});

// Atribuição de classe/valor
var notbareProp_2022 = notbareFC_2022.map(function(poligono){
  return poligono.set('landcover',0);
});
var bareProp_2022 = bareFC_2022.map(function(poligono){
  return poligono.set('landcover',1);
});

// Junção das amostras geradas
var pontosVal_2022 = notbareProp_2022.merge(bareProp_2022);



// CÁLCULO DE ACURÁCIA 2022
// Comparação entre amostras de validação e imagem classificada
var testPlanet_2022 = classification.sampleRegions({
  collection: pontosVal_2022,
  properties: ['landcover'],
  scale: 5,
  tileScale: 2
});
print(testPlanet_2022, 'sample');

// Geração de matriz de erro
var testConfusionPlanet_2022 = testPlanet_2022.errorMatrix('landcover','classification');
print('Planet Confusion Matrix - 2022', testConfusionPlanet_2022);
print('Planet Test Accuracy - 2022', testConfusionPlanet_2022.accuracy());



// VETORIZAÇÃO DAS ÁREAS DE SOLO EXPOSTO
var vectors = classification.reduceToVectors({
              geometry:RMSP, 
              scale:4,
              maxPixels:1100000000});
//Map.addLayer(vectors3)

// Exportação dos polígonos
Export.table.toAsset({
              collection:vectors, 
              description:'planet_vectors_' + year, 
              assetId:'users/juliacansado/TFG/PROMISSORES/planet_REMOVE_' + year
});
