//---------------------------------------------------------------------------------------

// 05_INCLUSÃO DE PROPRIEDADES - SOLO EXPOSTO: O (in)definido na Região Metropolitana de São Paulo

// DESCRIÇÃO: Código de inclusão de propriedades em áreas de solo exposto para 2022.
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




// INCLUSÃO DE PROPRIEDADES EM CADA POLÍGONO
// Polígonos de solo exposto
var vectors_2022 = ee.FeatureCollection('users/juliacansado/TFG/PROMISSORES/planet_REMOVE2_2022');

// Definição de ano e polígonos a serem processados
var year = 2017;
var table = vectors_2022;

// INCLUSÃO DA INFORMAÇÃO DE MUNICÍPIO EM CADA POLÍGONO
var mun_prop = table.map(function(poligono){
  var municipio = municipios.filterBounds(poligono.geometry());
  municipio = municipio.first();
  var getNome = municipio.get('SEM_ACENTO');
  var getCodigo = municipio.get('MUNIC_PI0');
  var area = poligono.geometry().area();
  return poligono.set('area',area)
                 .set('municipio',getNome)
                 .set('cod_municipio',getCodigo)
                 .set('ano',year);
});

// Filtro para remoção do polígono da RMSP
var polArea = mun_prop.filter(ee.Filter.lte('area',700000000));

// Divisão do dataset entre polígonos em São Paulo e não-São Paulo
var SP = polArea.filterBounds(distritos.geometry());
var not_SP = polArea.filter(ee.Filter.neq('municipio', 'SAO PAULO'));
//print(SP)


// INCLUSÃO DA INFORMAÇÃO DE DISTRITO E SUBPREFEITURA EM CADA POLÍGONO DA CIDADE DE SÃO PAULO
var subdist_prop = SP.map(function(poligono){
  var distrito = distritos.filterBounds(poligono.geometry());
  var getNomeDist = distrito.first().get('ds_nome');
  
  var subpref = subprefeituras.filterBounds(poligono.geometry());
  var getNomeSub = subpref.first().get('sp_nome');
  
  return poligono.set('distrito', getNomeDist)
                 .set('subpref', getNomeSub);
});

// Prencher campo de distrito e subprefeitura nas demais cidades
var subdist_sem_prop = not_SP.map(function(poligono){
  var hifen = '-';
  return poligono.set('distrito', hifen)
                 .set('subpref',hifen);
});


// JUNÇÃO DOS POLÍGONOS COM PROPRIEDADES
var final_geom = subdist_prop.merge(subdist_sem_prop);

// Filtro - apenas áreas com metragem superior à 150 m²
final_geom = final_geom.filter(ee.Filter.gte('area',150));

// Remoção de polígonos duplicados
var duplicates = final_geom.distinct('.geo');

// Remoção manual de áreas adicionais
var remove = duplicates.filter(ee.Filter.bounds(geometry).not());
Map.addLayer(remove);



// CORREÇÃO GRAFIA MOGI DAS CRUZES
// Separação do datase em "Moji" das Cruzes e não "Moji" das Cruzes
var moji = remove.filter(ee.Filter.eq('municipio','MOJI DAS CRUZES'));
var not_moji = remove.filter(ee.Filter.neq('municipio','MOJI DAS CRUZES'));

// Ajustar propriedade municipio para "MOGI DAS CRUZES"
var mojiCor = moji.map(function(pol){
  return pol.set({municipio:'MOGI DAS CRUZES'});
});

// Junção dos datasets
var final = not_moji.merge(mojiCor);

// Exportação Polígonos Finais
// Exportar como asset GEE
Export.table.toAsset({
    collection: final, 
    description: 'geometria_' + year, 
    assetId: 'users/juliacansado/TFG/PROMISSORES/mmapa_' + year});

// Exportar como arquivo .SHP
Export.table.toDrive({
    collection: final, 
    description: 'solo_exposto_' + year + '_drive', 
    folder: 'TFG-GEE',
    fileFormat: 'SHP'
});
