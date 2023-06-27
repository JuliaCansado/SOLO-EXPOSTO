//---------------------------------------------------------------------------------------

// 01_CLASSIFICAÇÃO - SOLO EXPOSTO: O (in)definido na Região Metropolitana de São Paulo

// DESCRIÇÃO: Código de classificação de áreas de solo exposto claro para 2022.
// AUTORES: Júlia Cansado sob orientação de Ana Cecília Campos e Mayumi Hirye 
// CONTATO: julia.cansado@usp.br

//---------------------------------------------------------------------------------------



// INPUTS
// Geometria da RMSP e bounding box RMSP
var RMSP_box = ee.FeatureCollection('users/juliacansado/TFG/BASES/MUN_RMSP').geometry().bounds().buffer(15000);
var RMSP = ee.FeatureCollection('users/juliacansado/TFG/BASES/MUN_RMSP');

// Parâmetros para visualização de mosaicos Planet, Sentinel e Landat, respectivamente
var imageVisParamPlanet = {"opacity":1,"bands":["R","G","B"],"min":-124.90109682345337,"max":1492.1354718234534,"gamma":1};
var imageVisParamSentinel = {"opacity":1,"bands":["B4","B3","B2"],"min":355.5,"max":1823,"gamma":1};
var imageVisParamLandsat = {"opacity":1,"bands":["SR_B4","SR_B3","SR_B2"],"min":7485,"max":24836,"gamma":1};

// Ponto escolhido para centralização do mapa
Map.setCenter(-46.683606, -23.459268,16); 

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



// IMAGEM PLANET 2022
// Coleção Planet no GEE Data Catalog
var planet = ee.ImageCollection("projects/planet-nicfi/assets/basemaps/americas");

// Filtro das imagens por período
var planetImageWet_2022 = planet.filter(ee.Filter.date('2022-06-01','2022-11-30')).median();
var planetImageDry_2022 = planet.filter(ee.Filter.date('2021-12-01','2022-05-31')).median();
var planetImage_2022 = planet.filter(ee.Filter.date('2022-06-01','2022-11-30')).median();

var planetFiltWet_2022 = planetImageWet_2022.clip(RMSP_box);
var planetFiltDry_2022 = planetImageDry_2022.clip(RMSP_box);
var planetFilt_2022 = planetImage_2022.clip(RMSP_box);
Map.addLayer(planetFilt_2022,imageVisParamPlanet,'Planet - 2022');

// Renomear bandas das imagens
planetFiltWet_2022 = planetFiltWet_2022.select(["B","G","R","N"],["blue","green","red","nir"]);
planetFiltDry_2022 = planetFiltDry_2022.select(["B","G","R","N"],["blue","green","red","nir"]);
planetFilt_2022 = planetFilt_2022.select(["B","G","R","N"],["blue","green","red","nir"]);

// Função para o cálculo de índices 
var compute_indices_planet = function(image) {
  var ndvi = image.expression(
  '(nir-red)/(nir+red)', {
    'nir': image.select('nir'),
    'red': image.select('red')
  }).rename('ndvi');
  return image.addBands(ndvi);
};

// Aplicação da função e junção de bandas
var planetMosaicWet_2022 = compute_indices_planet(planetFiltWet_2022);
planetMosaicWet_2022 = planetMosaicWet_2022.select(['ndvi'],['ndvi_wet']);
var planetMosaicDry_2022 = compute_indices_planet(planetFiltDry_2022);
planetMosaicDry_2022 = planetMosaicDry_2022.select(['ndvi'],['ndvi_dry']);
var planetMosaic_2022 = compute_indices_planet(planetFilt_2022);
planetMosaic_2022 = planetMosaic_2022.addBands(planetMosaicWet_2022,['ndvi_wet']).addBands(planetMosaicDry_2022,['ndvi_dry']);
print(planetMosaic_2022);
//Map.addLayer(planetMosaic);



// IMAGEM SENTINEL 2022
// Coleção Sentinel no GEE Data Catalog
var sentinelImage = ee.ImageCollection("COPERNICUS/S2_HARMONIZED");

// Filtro das imagens por período e quantidade de nuvens
var sentinelFilt_Wet = sentinelImage.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
                            .filter(ee.Filter.date('2022-06-01', '2022-11-30'))
                            .median().clip(RMSP_box);
var sentinelFilt_Dry = sentinelImage.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
                            .filter(ee.Filter.date('2021-12-01', '2022-05-31'))
                            .median().clip(RMSP_box);
var sentinelFilt = sentinelImage.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
                            .filter(ee.Filter.date('2022-06-01','2022-11-30'))
                            .median().clip(RMSP_box);
Map.addLayer(sentinelFilt,imageVisParamSentinel,'Sentinel - 2022');
//print(sentinelFilt);

// Renomear bandas das imagens
sentinelFilt_Wet = sentinelFilt_Wet.select(["B1","B2","B3","B4","B5","B6","B7","B8","B8A","B9","B10","B11","B12","QA10","QA20","QA60"],
                                    ["aerosols","blue","green","red","red_edge1","red_edge2","red_edge3",
                                    "nir","red_edge4","water_vapor","cirrus","swir1","swir2","QA10","QA20","QA60"]);
sentinelFilt_Dry = sentinelFilt_Dry.select(["B1","B2","B3","B4","B5","B6","B7","B8","B8A","B9","B10","B11","B12","QA10","QA20","QA60"],
                                    ["aerosols","blue","green","red","red_edge1","red_edge2","red_edge3",
                                    "nir","red_edge4","water_vapor","cirrus","swir1","swir2","QA10","QA20","QA60"]);
sentinelFilt = sentinelFilt.select(["B1","B2","B3","B4","B5","B6","B7","B8","B8A","B9","B10","B11","B12","QA10","QA20","QA60"],
                                    ["aerosols","blue","green","red","red_edge1","red_edge2","red_edge3",
                                    "nir","red_edge4","water_vapor","cirrus","swir1","swir2","QA10","QA20","QA60"]);
print(sentinelFilt);

// Função para o cálculo de índices 
var compute_indices_sentinel = function(image) {
  var ndvi = image.expression(
  '(nir-red)/(nir+red)', {
    'nir': image.select('nir'),
    'red': image.select('red')
  }).rename('ndvi');
  
  var ndbi = image.expression(
  '(swir1-nir)/(swir1+nir)', {
    'swir1': image.select('swir1'),
    'nir': image.select('nir')
  }).rename('ndbi');
  
 var bare_soil = image.expression(
  '(swir2+red)-(nir+blue)/(swir2+red)+(nir+blue)', {
    'swir2': image.select('swir2'),
    'blue': image.select('blue'),
    'nir': image.select('nir'),
    'red': image.select('red')
  }).rename('bare_soil');
  return image.addBands(ndvi).addBands(ndbi).addBands(bare_soil);
};

// Aplicação da função e junção de bandas
var sentinelMosaic_2022 = compute_indices_sentinel(sentinelFilt);
var sentinelMosaicWet_2022 = compute_indices_sentinel(sentinelFilt_Wet);
sentinelMosaicWet_2022 = sentinelMosaicWet_2022.select(['ndvi','ndbi','bare_soil'],['ndvi_wet','ndbi_wet','bare_soil_wet']);
var sentinelMosaicDry_2022 = compute_indices_sentinel(sentinelFilt_Dry);
sentinelMosaicDry_2022 = sentinelMosaicDry_2022.select(['ndvi','ndbi','bare_soil'],['ndvi_dry','ndbi_dry','bare_soil_dry']);
sentinelMosaic_2022 = sentinelMosaic_2022.addBands(sentinelMosaicWet_2022).addBands(sentinelMosaicDry_2022);
//print(sentinelMosaic);
//Map.addLayer(sentinelMosaic);



// IMAGEM LANDSAT 2022
// Coleção Sentinel no GEE Data Catalog
var landsatImage = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2");

// Filtro das imagens por período e quantidade de nuvens
var landsatFilt_Wet = landsatImage.filter(ee.Filter.lt('CLOUD_COVER', 30))
                            .filter(ee.Filter.date('2022-06-01', '2022-11-30'))
                            .median().clip(RMSP_box);
var landsatFilt_Dry = landsatImage.filter(ee.Filter.lt('CLOUD_COVER', 30))
                            .filter(ee.Filter.date('2021-12-01', '2022-05-31'))
                            .median().clip(RMSP_box);
var landsatFilt = landsatImage.filter(ee.Filter.lt('CLOUD_COVER', 30))
                            .filter(ee.Filter.date('2022-06-01','2022-11-30'))
                            .median().clip(RMSP_box);
Map.addLayer(landsatFilt,imageVisParamLandsat,'Landsat - 2022');

// Renomear bandas das imagens
landsatFilt_Wet = landsatFilt_Wet.select(["SR_B1","SR_B2","SR_B3","SR_B4","SR_B5","SR_B6","SR_B7","SR_QA_AEROSOL"],
                                ["aerosol","blue","green","red","nir","swir1","swir2","aerosol_att"]);
landsatFilt_Dry = landsatFilt_Dry.select(["SR_B1","SR_B2","SR_B3","SR_B4","SR_B5","SR_B6","SR_B7","SR_QA_AEROSOL"],
                                ["aerosol","blue","green","red","nir","swir1","swir2","aerosol_att"]);
landsatFilt = landsatFilt.select(["SR_B1","SR_B2","SR_B3","SR_B4","SR_B5","SR_B6","SR_B7","SR_QA_AEROSOL"],
                                ["aerosol","blue","green","red","nir","swir1","swir2","aerosol_att"]);
//print(landsatFilt);

// Função para o cálculo de índices 
var compute_indices_landsat = function(image) {
  var ndvi = image.expression(
  '(nir-red)/(nir+red)', {
    'nir': image.select('nir'),
    'red': image.select('red')
  }).rename('ndvi');
  
  var ndbi = image.expression(
  '(swir1-nir)/(swir1+nir)', {
    'swir1': image.select('swir1'),
    'nir': image.select('nir')
  }).rename('ndbi');
  
 var bare_soil = image.expression(
  '(swir2+red)-(nir+blue)/(swir2+red)+(nir+blue)', {
    'swir2': image.select('swir2'),
    'blue': image.select('blue'),
    'nir': image.select('nir'),
    'red': image.select('red')
  }).rename('bare_soil');
  return image.addBands(ndvi).addBands(ndbi).addBands(bare_soil);
};

// Aplicação da função e junção de bandas
var landsatMosaic_2022 = compute_indices_landsat(landsatFilt);
var landsatMosaicWet_2022 = compute_indices_landsat(landsatFilt_Wet);
landsatMosaicWet_2022 = landsatMosaicWet_2022.select(['ndvi','ndbi','bare_soil'],['ndvi_wet','ndbi_wet','bare_soil_wet']);
var landsatMosaicDry_2022 = compute_indices_landsat(landsatFilt_Dry);
landsatMosaicDry_2022 = landsatMosaicDry_2022.select(['ndvi','ndbi','bare_soil'],['ndvi_dry','ndbi_dry','bare_soil_dry']);
landsatMosaic_2022 = landsatMosaic_2022.addBands(landsatMosaicWet_2022).addBands(landsatMosaicDry_2022);
//print(landsatMosaic);
//Map.addLayer(landsatMosaic);



// GERAR PONTOS DE AMOSTRAS DENTRO DOS POLÍGONOS DESENHADOS
// Pontos não-solo exposto
var notbareFC_2022 = ee.FeatureCollection.randomPoints({
  region: notbare_2022,
  points: 1200,
  seed: 24
});

//Pontos solo exposto
var bareFC_2022 = ee.FeatureCollection.randomPoints({
  region: bare_2022,
  points: 400,
  seed: 24
});

// Atribuição de classe/valor
var notbareProp_2022 = notbareFC_2022.map(function(poligono){
  return poligono.set('landcover',0);
});
var bareProp_2022 = bareFC_2022.map(function(poligono){
  return poligono.set('landcover',1);
});

// Separação entre amostras de treinamento e validação
var pontosTotais_2022 = notbareProp_2022.merge(bareProp_2022).randomColumn();
var pontosTraining_2022 = pontosTotais_2022.filter(ee.Filter.lt('random',0.7));
var pontosValidation_2022 = pontosTotais_2022.filter(ee.Filter.gte('random', 0.7));



// TREINAMENTO E CLASSIFICAÇÃO - PLANET
// Treinamento amostras
var trainingPlanet_2022 = planetMosaic_2022.sampleRegions({
  collection: pontosTraining_2022, 
  properties: ['landcover'], 
  scale: 5
}); 
//print(trainingPlanet);

// Treinamento do classificador
var classifierPlanet_2022 = ee.Classifier.smileRandomForest({numberOfTrees: 50, seed: 24}).train({
  features: trainingPlanet_2022, 
  classProperty: 'landcover'
});
classifierPlanet_2022 = classifierPlanet_2022.setOutputMode('PROBABILITY');

// Classificação da imagem
var classifiedPlanet_2022 = planetMosaic_2022.classify(classifierPlanet_2022);
//print(classifiedPlanet)

// Filtro - apenas pixels com probabilidade superior a 75% de corresponderem a solo exposto
var baresoilPlanet_2022 = classifiedPlanet_2022.gt(0.75);
//print(baresoilPlanet)
//Map.addLayer(classifiedPlanet, {min: 0, max: 3, palette: ['blue', 'brown', 'gray', 'green']}, 'Planet Classify - 2022',false); 
Map.addLayer(classifiedPlanet_2022.sldStyle(prob_intervals),{},'baresoil - Planet');

// Exportação da imagem
Export.image.toAsset({image: classifiedPlanet_2022, 
                    description: 'planet_2022_class2', 
                    assetId: 'users/juliacansado/TFG/PROMISSORES/planet_2022_class2', 
                    region: RMSP_box, 
                    maxPixels:1200000000,
                    scale: 5});



// CÁLCULO DE ACURÁCIA PLANET
// Comparação entre amostras de validação e imagem classificada
var testPlanet_2022 = baresoilPlanet_2022.sampleRegions({
  collection: pontosValidation_2022,
  properties: ['landcover'],
  scale: 5,
  tileScale: 2
});
print(testPlanet_2022, 'sample');

// Geração de matriz de erro
var testConfusionPlanet_2022 = testPlanet_2022.errorMatrix('landcover','classification');
print('Planet Confusion Matrix', testConfusionPlanet_2022);
print('Planet Test Accuracy', testConfusionPlanet_2022.accuracy());



// TREINAMENTO E CLASSIFICAÇÃO - SENTINEL
// Treinamento amostras
var trainingSentinel = sentinelMosaic_2022.sampleRegions({
  collection: pontosTraining_2022, 
  properties: ['landcover'], 
  scale: 10,
  tileScale: 3
});
//print(trainingSentinel);

// Treinamento do classificador
var classifierSentinel = ee.Classifier.smileRandomForest({numberOfTrees: 50, seed: 24}).train({
  features: trainingSentinel, 
  classProperty: 'landcover'
});
classifierSentinel = classifierSentinel.setOutputMode('PROBABILITY');

// Classificação da imagem
var classifiedSentinel = sentinelMosaic_2022.classify(classifierSentinel);

// Filtro - apenas pixels com probabilidade superior a 75% de corresponderem a solo exposto
var baresoilSentinel = classifiedSentinel.gte(0.75);
print(baresoilSentinel);
//Map.addLayer(classifiedSentinel, {min: 0, max: 3, palette: ['blue', 'brown', 'gray', 'green']}, 'Sentinel Classify - 2022',false); 
Map.addLayer(classifiedSentinel.sldStyle(prob_intervals),{},'baresoil - Sentinel');

// Exportação da imagem
Export.image.toAsset({image: baresoilSentinel, 
                    description: '06-2022-11-2022-index_prob_sentinel', 
                    assetId: 'users/juliacansado/TFG/test1_2022_sentinel', 
                    region: RMSP_box, 
                    maxPixels:300000000,
                    scale: 10});



// CÁLCULO DE ACURÁCIA SENTINEL
// Comparação entre amostras de validação e imagem classificada
var testSentinel = baresoilSentinel.sampleRegions({
  collection: pontosValidation_2022,
  properties: ['landcover'],
  scale: 10
});
//print(testSentinel)

// Geração de matriz de erro
var testConfusionSentinel = testSentinel.errorMatrix('landcover','classification');
print('Sentinel Confusion Matrix', testConfusionSentinel);
print('Sentinel Test Accuracy', testConfusionSentinel.accuracy());



// TREINAMENTO E CLASSIFICAÇÃO - LANDSAT
// Treinamento amostras
var trainingLandsat_2022 = landsatMosaic_2022.sampleRegions({
  collection: pontosTraining_2022, 
  properties: ['landcover'], 
  scale: 30,
  tileScale: 2
}); 
 
//print(trainingLandsat);

// Treinamento do classificador
var classifierLandsat_2022 = ee.Classifier.smileRandomForest({numberOfTrees: 50, seed: 24}).train({
  features: trainingLandsat_2022, 
  classProperty: 'landcover'
});
classifierLandsat_2022 = classifierLandsat_2022.setOutputMode('PROBABILITY');

// Classificação da imagem
var classifiedLandsat_2022 = landsatMosaic_2022.classify(classifierLandsat_2022);

// Filtro - apenas pixels com probabilidade superior a 75% de corresponderem a solo exposto
var baresoilLandsat_2022 = classifiedLandsat_2022.gte(0.75);
//Map.addLayer(classifiedLandsat, {min: 0, max: 3, palette: ['blue', 'brown', 'gray', 'green']}, 'Landsat Classify - 2022'); 
Map.addLayer(classifiedLandsat_2022.sldStyle(prob_intervals),{},'baresoil - Landsat');

// Exportação da imagem
Export.image.toAsset({image: baresoilLandsat_2022, 
                    description: '06-2022-11-2022-index_prob_landsat', 
                    assetId: 'users/juliacansado/TFG/test1_2022_landsat', 
                    region: RMSP_box, 
                    maxPixels:120000000,
                    scale: 25});



// CÁLCULO DE ACURÁCIA LANDSAT
// Comparação entre amostras de validação e imagem classificada
var testLandsat_2022 = baresoilLandsat_2022.sampleRegions({
  collection: pontosValidation_2022,
  properties: ['landcover'],
  scale: 30,
  tileScale:2
});
//print(testLandsat);

// Geração de matriz de erro
var testConfusionLandsat_2022 = testLandsat_2022.errorMatrix('landcover','classification');
print('Landsat Error Matrix', testConfusionLandsat_2022);
print('Landsat Confusion Matrix', ee.ConfusionMatrix(testConfusionLandsat_2022));
print('Landsat Test Accuracy', testConfusionLandsat_2022.accuracy());
