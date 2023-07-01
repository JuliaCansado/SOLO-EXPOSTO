// WIDGET - SOLO EXPOSTO: O (in)definido na Região Metropolitana de São Paulo

// DESCRIÇÃO: Plataforma para visualização do mapeamento de áreas de solo exposto
// AUTORES: Júlia Cansado sob orientação de Ana Cecília Campos e Mayumi Hirye 
// CONTATO: julia.cansado@usp.br

// VERSÃO: 1.0 - Setup widget, testes de visualização
//         2.0 - Mosaicos, menus 
//         3.0 - "Polaroid" tentativa de focar em áreas de solo exposto
//         4.0 - Menu de Geometrias
//         5.0 - Mosaicos Planet e mapas
//         6.0 - Inclusão de Gráficos
//         7.0 - Inclusão MapBiomas Mineração e AU 

// REMOÇÃO MAPA DEFAULT
ui.root.clear();

// DEFINIÇÃO CENTRO
var center = {lon: -46.5065, lat: -23.631, zoom: 9.8};

// DEFINIÇÃO PARÂMETROS MAPA BASE ESQUERDO
var leftPanel = ui.Panel({style: {position: 'top-left'}});
var leftMap = ui.Map({center: center, style: {width: '80%'}}); //sets width of leftPanel
leftMap.setOptions("SATELLITE");
// DEFINIÇÃO PARÂMETROS MAPA BASE DIREITO
var rightPanel = ui.Panel({style: {position: 'top-right'}});
var rightMap = ui.Map(center);
rightMap.setOptions("SATELLITE");

// DEFINIÇÃO PAINÉIS SIMULTÂNEOS
var splitSet = ui.SplitPanel({firstPanel: leftMap,
                              secondPanel: rightMap,
                              wipe: true
});

// REMOÇÃO CONTROLES DO MAPA
leftMap.setControlVisibility({all: false, layerList: true});
rightMap.setControlVisibility({all: false, layerList: true});


// INPUTS
var RMSP_box = ee.FeatureCollection('users/juliacansado/TFG/BASES/MUN_RMSP').geometry().bounds().buffer(15000);
var RMSP_0 = ee.FeatureCollection('users/juliacansado/TFG/BASES/MUN_RMSP');
print(RMSP_0.aggregate_array('SEM_ACENTO'))
var RMSP = ee.FeatureCollection('users/juliacansado/TFG/BASES/RMSP2');
var geometry = ee.Geometry.Polygon(
        [[[-49.554727545767385, -21.594586206636524],
          [-49.554727545767385, -25.173593868017047],
          [-43.424356452017385, -25.173593868017047],
          [-43.424356452017385, -21.594586206636524]]], null, false);

//Map.addLayer(RMSP);
var RMSP_dissolve = RMSP.geometry().dissolve();
//Map.addLayer(RMSP_dissolve);

var SP_distritos = ee.FeatureCollection('users/juliacansado/TFG/BASES/distritos_SP');
var SP_subprefeituras = ee.FeatureCollection('users/juliacansado/TFG/BASES/subprefeitura_SP');

var logo2 = ee.Image('users/juliacansado/TFG/solo-exp-laranja'); //laranja
var logo1 = ee.Image('users/juliacansado/TFG/solo-exp-preto'); //preto

var mosaicPlanet_2017 = ee.Image('users/juliacansado/TFG/MOSAICOS/mosaico_2017');
mosaicPlanet_2017 = mosaicPlanet_2017.clip(RMSP_dissolve);
var mosaicPlanet_2018 = ee.Image('users/juliacansado/TFG/MOSAICOS/mosaico_2018');
mosaicPlanet_2018 = mosaicPlanet_2018.clip(RMSP_dissolve);
var mosaicPlanet_2019 = ee.Image('users/juliacansado/TFG/MOSAICOS/mosaico_2019');
mosaicPlanet_2019 = mosaicPlanet_2019.clip(RMSP_dissolve);
var mosaicPlanet_2020 = ee.Image('users/juliacansado/TFG/MOSAICOS/mosaico_2020');
mosaicPlanet_2020 = mosaicPlanet_2020.clip(RMSP_dissolve);
var mosaicPlanet_2021 = ee.Image('users/juliacansado/TFG/MOSAICOS/mosaico_2021');
mosaicPlanet_2021 = mosaicPlanet_2021.clip(RMSP_dissolve);
var mosaicPlanet_2022 = ee.Image('users/juliacansado/TFG/MOSAICOS/mosaico_2022');
mosaicPlanet_2022 = mosaicPlanet_2022.clip(RMSP_dissolve);
var imageVisParamPlanet = {"opacity":1,"bands":["R","G","B"],"min":-124.90109682345337,"max":1492.1354718234534,"gamma":1};

var mapa_2017 = ee.FeatureCollection('users/juliacansado/TFG/PROMISSORES/mapa_2017');
//print(mapa_2017.first())
var mapa_2017_style = mapa_2017.style({color: '#c73f18',
                            width: 1.5, 
                            fillColor: '#c73f1880',
                            lineType: 'solid'});
var mapa_2018 = ee.FeatureCollection('users/juliacansado/TFG/PROMISSORES/mapa_2018');
var mapa_2018_style = mapa_2018.style({color: '#c73f18',
                            width: 1.5, 
                            fillColor: '#c73f1880',
                            lineType: 'solid'});
var mapa_2019 = ee.FeatureCollection('users/juliacansado/TFG/PROMISSORES/mapa_2019');
var mapa_2019_style = mapa_2019.style({color: '#c73f18',
                            width: 1.5, 
                            fillColor: '#c73f1880',
                            lineType: 'solid'});
var mapa_2020 = ee.FeatureCollection('users/juliacansado/TFG/PROMISSORES/mapa_2020');
var mapa_2020_style = mapa_2020.style({color: '#c73f18',
                            width: 1.5, 
                            fillColor: '#c73f1880',
                            lineType: 'solid'});
var mapa_2021 = ee.FeatureCollection('users/juliacansado/TFG/PROMISSORES/mapa_2021');
var mapa_2021_style = mapa_2021.style({color: '#c73f18',
                            width: 1.5, 
                            fillColor: '#c73f1880',
                            lineType: 'solid'});
var mapa_2022 = ee.FeatureCollection('users/juliacansado/TFG/PROMISSORES/mapa_2022');
var mapa_2022_style = mapa_2022.style({color: '#c73f18',
                            width: 1.5, 
                            fillColor: '#c73f1880',
                            lineType: 'solid'});

var mmapa_2017 = ee.FeatureCollection('users/juliacansado/TFG/PROMISSORES/mmapa_2017');
//print(mapa_2017.first())
var mmapa_2017_style = mmapa_2017.style({color: '#c73f18',
                            width: 1.5, 
                            fillColor: '#c73f1880',
                            lineType: 'solid'});
var mmapa_2018 = ee.FeatureCollection('users/juliacansado/TFG/PROMISSORES/mmapa_2018');
var mmapa_2018_style = mmapa_2018.style({color: '#c73f18',
                            width: 1.5, 
                            fillColor: '#c73f1880',
                            lineType: 'solid'});
var mmapa_2019 = ee.FeatureCollection('users/juliacansado/TFG/PROMISSORES/mmapa_2019');
var mmapa_2019_style = mmapa_2019.style({color: '#c73f18',
                            width: 1.5, 
                            fillColor: '#c73f1880',
                            lineType: 'solid'});
var mmapa_2020 = ee.FeatureCollection('users/juliacansado/TFG/PROMISSORES/mmapa_2020');
var mmapa_2020_style = mmapa_2020.style({color: '#c73f18',
                            width: 1.5, 
                            fillColor: '#c73f1880',
                            lineType: 'solid'});
var mmapa_2021 = ee.FeatureCollection('users/juliacansado/TFG/PROMISSORES/mmapa_2021');
var mmapa_2021_style = mapa_2021.style({color: '#c73f18',
                            width: 1.5, 
                            fillColor: '#c73f1880',
                            lineType: 'solid'});
var mmapa_2022 = ee.FeatureCollection('users/juliacansado/TFG/PROMISSORES/mmapa_2022');
var mmapa_2022_style = mmapa_2022.style({color: '#c73f18',
                            width: 1.5, 
                            fillColor: '#c73f1880',
                            lineType: 'solid'});
var areaPorMun = ee.FeatureCollection('users/juliacansado/TFG/APP/AreaPorMun');
var areaTotalAno = ee.FeatureCollection('users/juliacansado/TFG/APP/AreaTotalAno');
areaTotalAno = areaTotalAno.sort('ano');

var MapBiomas = ee.Image('projects/mapbiomas-workspace/public/collection7_1/mapbiomas_collection71_integration_v1');
//print(MapBiomas);



// DEFINIÇÃO LAYERS MAPAS
// LAYER ID 0
var image0_1 = ee.Image(0).clip(geometry);
var image0_2 = ee.Image(0).clip(geometry);
leftMap.addLayer(image0_1,{palette:'#062325', opacity: 0.6},'azul');
rightMap.addLayer(image0_2,{palette:'#062325', opacity: 0.6},'azul');

// LAYER ID 1
leftMap.addLayer(mosaicPlanet_2017,imageVisParamPlanet,'Mosaic Planet - 2017', true);
rightMap.addLayer(mosaicPlanet_2022,imageVisParamPlanet,'Mosaic Planet - 2022', true);

// LAYER ID 2
leftMap.addLayer(mapa_2017_style,{},'Áreas de Possível Solo Exposto - 2017',false);
rightMap.addLayer(mapa_2022_style,{},'Áreas de Possível Solo Exposto - 2022',false);

//LAYER ID 3
var area_urbanizada = MapBiomas.eq(24).selfMask();
leftMap.addLayer(area_urbanizada,{bands:['classification_2017']},'Área Urbanizada - 2017',false);
rightMap.addLayer(area_urbanizada,{bands:['classification_2021']},'Área Urbanizada - 2021',false);

//LAYER ID 4
var mineracao = MapBiomas.eq(30).selfMask();
leftMap.addLayer(area_urbanizada,{bands:['classification_2017']},'Área de Mineração - 2017',false);
rightMap.addLayer(area_urbanizada,{bands:['classification_2021']},'Área de Mineração - 2021',false);

// LAYER ID ANTEPENÚLTIMO (5)
var RMSP_style = RMSP.style({color: '#ffffff',
                            width: 1.5, 
                            fillColor: '#015f6300',
                            lineType: 'solid'});
leftMap.addLayer(RMSP_style,{},'RMSP',false);
rightMap.addLayer(RMSP_style,{},'RMSP',false);  

// LAYER ID PENÚLTIMO (6)
var SP_dist_style = SP_distritos.style({color: '#ffffff',
                            width: 1.5, 
                            fillColor: '#015f6300',
                            lineType: 'solid'});
leftMap.addLayer(SP_dist_style,{},'SP_dist',false);
rightMap.addLayer(SP_dist_style,{},'SP_dist',false);  

// LAYER ID ÚLTIMO (7)
var SP_sub_style = SP_subprefeituras.style({color: '#ffffff',
                            width: 1.5, 
                            fillColor: '#015f6300',
                            lineType: 'solid'});
leftMap.addLayer(SP_sub_style,{},'SP_sub',false);
rightMap.addLayer(SP_sub_style,{},'SP_sub',false);  




// MENU IMAGEM BASE
// CRIAÇÃO DICIONÁRIOS DE IMAGENS
var baseDic1 ={
  'IMAGEM 2017':['POSSÍVEIS ÁREAS DE SOLO EXPOSTO EM 2017',mosaicPlanet_2017,imageVisParamPlanet,mapa_2017_style,mapa_2017,mmapa_2017],
  'IMAGEM 2018':['POSSÍVEIS ÁREAS DE SOLO EXPOSTO EM 2018',mosaicPlanet_2018,imageVisParamPlanet,mapa_2018_style,mapa_2018,mmapa_2018],
  'IMAGEM 2019':['POSSÍVEIS ÁREAS DE SOLO EXPOSTO EM 2019',mosaicPlanet_2019,imageVisParamPlanet,mapa_2019_style,mapa_2019,mmapa_2019],
  'IMAGEM 2020':['POSSÍVEIS ÁREAS DE SOLO EXPOSTO EM 2020',mosaicPlanet_2020,imageVisParamPlanet,mapa_2020_style,mapa_2020,mmapa_2020],
  'IMAGEM 2021':['POSSÍVEIS ÁREAS DE SOLO EXPOSTO EM 2021',mosaicPlanet_2021,imageVisParamPlanet,mapa_2021_style,mapa_2021,mmapa_2021],
  'IMAGEM 2022':['POSSÍVEIS ÁREAS DE SOLO EXPOSTO EM 2022',mosaicPlanet_2022,imageVisParamPlanet,mapa_2022_style,mapa_2022,mmapa_2022],
};

var baseDic2 ={
  'IMAGEM 2017':['POSSÍVEIS ÁREAS DE SOLO EXPOSTO EM 2017',mosaicPlanet_2017,imageVisParamPlanet,mapa_2017_style,mapa_2017,mmapa_2017],
  'IMAGEM 2018':['POSSÍVEIS ÁREAS DE SOLO EXPOSTO EM 2018',mosaicPlanet_2018,imageVisParamPlanet,mapa_2018_style,mapa_2018,mmapa_2018],
  'IMAGEM 2019':['POSSÍVEIS ÁREAS DE SOLO EXPOSTO EM 2019',mosaicPlanet_2019,imageVisParamPlanet,mapa_2019_style,mapa_2019,mmapa_2019],
  'IMAGEM 2020':['POSSÍVEIS ÁREAS DE SOLO EXPOSTO EM 2020',mosaicPlanet_2020,imageVisParamPlanet,mapa_2020_style,mapa_2020,mmapa_2020],
  'IMAGEM 2021':['POSSÍVEIS ÁREAS DE SOLO EXPOSTO EM 2021',mosaicPlanet_2021,imageVisParamPlanet,mapa_2021_style,mapa_2021,mmapa_2021],
  'IMAGEM 2022':['POSSÍVEIS ÁREAS DE SOLO EXPOSTO EM 2022',mosaicPlanet_2022,imageVisParamPlanet,mapa_2022_style,mapa_2022,mmapa_2022],
};

// CONFIGURAÇÃO MENUS SELETORES E CHECKBOX
var selectorBase1 = ui.Select({items:Object.keys(baseDic1), value: 'IMAGEM 2017', style:{position:'bottom-left', width:'255px'}});
var selectorBase2 = ui.Select({items:Object.keys(baseDic2), value: 'IMAGEM 2022', style:{position:'bottom-right', width:'255px'}});
var soloCheck1 = ui.Checkbox({label:'POSSÍVEIS ÁREAS DE SOLO EXPOSTO EM 2017', style:{textAlign:'center', /*fontWeight:'bold',*/ color:'#c73f18'}});
var soloCheck2 = ui.Checkbox({label:'POSSÍVEIS ÁREAS DE SOLO EXPOSTO EM 2022', style:{textAlign:'center', /*fontWeight:'bold',*/ color:'#c73f18'}});


selectorBase1.onChange(function(selection){
  soloCheck1.setLabel(baseDic1[selection][0]);
  var mapa = baseDic1[selection][3];
  var layer = baseDic1[selection][1];
  var viz = baseDic1[selection][2];
  
  leftMap.layers().set(1,ee.Image(layer).visualize(viz));
  leftMap.layers().set(2,mapa);
  leftMap.layers().get(2).setShown(soloCheck1.getValue());
});

leftMap.add(selectorBase1);

selectorBase2.onChange(function(selection){
  soloCheck2.setLabel(baseDic2[selection][0]);
  var mapa = baseDic2[selection][3];
  var layer = baseDic2[selection][1];
  var viz = baseDic2[selection][2];
  
  rightMap.layers().set(1,ee.Image(layer).visualize(viz));
  rightMap.layers().set(2,mapa);
  rightMap.layers().get(2).setShown(soloCheck1.getValue());
});

rightMap.add(selectorBase2);



// CHECKBOX POSSÍVEIS ÁREAS DE SOLO EXPOSTO
var soloPanel1 = ui.Panel({style:{width:'255px', position: 'bottom-left'}});
var soloPanel2 = ui.Panel({style:{width:'255px', position: 'bottom-right'}});

soloCheck1.onChange(function(check){
    leftMap.layers().get(2).setShown(check);
});

soloPanel1.add(soloCheck1);
leftMap.add(soloPanel1);

soloCheck2.onChange(function(check){
    rightMap.layers().get(2).setShown(check);
});

soloPanel2.add(soloCheck2);
rightMap.add(soloPanel2);

// LABELS TÍTULO
var logoPanel1 = ui.Panel({style:{width:'255px',position:'top-right'}});
var logoPanel2 = ui.Panel({style:{width:'255px',position:'top-right'}});

// CONFIGURAR LOGO MAPA ESQUERDO
var logo1t = logo2.visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
    
var thumb1 = ui.Thumbnail({
    image: logo1t,
    params: {
        dimensions: '767x126',
        format: 'png'
        },
    style: { width: '225px',padding :'0px 0px 0px 0px'}
    });

// CONFIGURAR LOGO MAPA DIREITO
var logo2t = logo2.visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
    
var thumb2 = ui.Thumbnail({
    image: logo2t,
    params: {
        dimensions: '767x126',
        format: 'png'
        },
    style: { width: '225px',padding :'0px 0px 0px 0px'}
    });

// GERAÇÃO GRÁFICOS

var dicCid = {
'ARUJÁ': ['ARUJA','ARUJA'],
'BARUERI': ['BARUERI','BARUERI'],
'BIRITIBA-MIRIM': ['BIRITIBA-MIRIM','BIRITIBA-MIRIM'],
'CAIEIRAS': ['CAIEIRAS','CAIEIRAS'],
'CAJAMAR': ['CAJAMAR','CAJAMAR'],
'CARAPICUIBA': ['CARAPICUIBA','CARAPICUIBA'],
'COTIA': ['COTIA','COTIA'],
'DIADEMA': ['DIADEMA','DIADEMA'],
'EMBU': ['EMBU','EMBU'],
'EMBU-GUACU': ['EMBU-GUACU','EMBU-GUACU'],
'FERRAZ DE VASCONCELOS': ['FERRAZ DE VASCONCELOS','FERRAZ DE VASCONCELOS'],
'FRANCISCO MORATO': ['FRANCISCO MORATO','FRANCISCO MORATO'],
'FRANCO DA ROCHA': ['FRANCO DA ROCHA','FRANCO DA ROCHA'],
'GUARAREMA': ['GUARAREMA','GUARAREMA'],
'GUARULHOS': ['GUARULHOS','GUARULHOS'],
'ITAPECERICA DA SERRA': ['ITAPECERICA DA SERRA','ITAPECERICA DA SERRA'],
'ITAPEVI': ['ITAPEVI','ITAPEVI'],
'ITAQUAQUECETUBA': ['ITAQUAQUECETUBA','ITAQUAQUECETUBA'],
'JANDIRA': ['JANDIRA','JANDIRA'],
'JUQUITIBA': ['JUQUITIBA','JUQUITIBA'],
'MAIRIPORÃ': ['MAIRIPORA','MAIRIPORÃ'],
'MAUÁ': ['MAUA','MAUÁ'],
'MOGI DAS CRUZES': ['MOJI DAS CRUZES','MOGI DAS CRUZES'],
'OSASCO': ['OSASCO','OSASCO'],
'PIRAPORA DO BOM JESUS': ['PIRAPORA DO BOM JESUS','PIRAPORA DO BOM JESUS'],
'POÁ': ['POA','POÁ'],
'RIBEIRAO PIRES': ['RIBEIRAO PIRES','RIBEIRÃO PIRES'],
'RIO GRANDE DA SERRA': ['RIO GRANDE DA SERRA','RIO GRANDE DA SERRA'],
'SALESÓPOLIS': ['SALESOPOLIS','SALESÓPOLIS'],
'SANTA ISABEL': ['SANTA ISABEL','SANTA ISABEL'],
'SANTANA DE PARNAÍBA': ['SANTANA DE PARNAIBA','SANTANA DE PARNAÍBA'],
'SANTO ANDRÉ': ['SANTO ANDRE','SANTO ANDRÉ'],
'SÃO BERNARDO DO CAMPO': ['SAO BERNARDO DO CAMPO','SÃO BERNARDO DO CAMPO'],
'SÃO CAETANO DO SUL': ['SAO CAETANO DO SUL','SÃO CAETANO DO SUL'],
'SÃO LOURENCO DA SERRA': ['SAO LOURENCO DA SERRA','SÃO LOURENCO DA SERRA'],
'SÃO PAULO': ['SAO PAULO','SÃO PAULO'],
'SUZANO': ['SUZANO','SUZANO'],
'TABOÃO DA SERRA': ['TABOAO DA SERRA','TABOÃO DA SERRA'],
'VARGEM GRANDE PAULISTA': ['VARGEM GRANDE PAULISTA','VARGEM GRANDE PAULISTA'],
};

var graphPanelMun = ui.Panel({style:{position: 'bottom-left', width:'400px'}});
var buttonSelect = ui.Select({items: Object.keys(dicCid), placeholder: 'VISUALIZAR GRÁFICO POR CIDADE',style:{width:'220px'}});
var voltarCidade = ui.Button({label:'VER DADOS SOBRE OUTRA CIDADE?',style:{width:'220px'}});

var graphPanelAT = ui.Panel({style:{position: 'bottom-left', width:'400px'}});
var buttonAT = ui.Button({label:'ÁREA TOTAL MAPEADA',style:{width:'220px'}});
var voltarArea = ui.Button({label:'FECHAR GRÁFICO ÁREA TOTAL',style:{width:'220px'}});

var panelIndividual = ui.Panel({style:{position: 'bottom-left', width:'400px'}});
var buttonInd = ui.Button({label:'INVESTIGAR MANCHA',style:{width:'180px', color:'#c73f18'}});
var instrucoes = ui.Label({value:'Ligue as possíveis áreas de solo exposto e clique em alguma para saber mais!', style:{textAlign: 'center',width:'370px', height:'50px'}});

buttonInd.onClick(function(click){

  leftMap.remove(graphPanelMun);
  leftMap.remove(graphPanelAT);

  graphPanelAT.clear();
  graphPanelMun.clear();
  panelIndividual.clear();
  panelIndividual.add(instrucoes);
  buttonPanel3.remove(buttonInd);
  buttonPanel3.add(voltarInvest);
  
  var selectedPoint = [];

function handleMapClick(click) {
  panelIndividual.widgets().reset();
  selectedPoint = [click.lon, click.lat];
  var click1 = ee.Geometry.Point(selectedPoint).buffer(15);
  var click_2017 = mapa_2017.filterBounds(click1).first();
  var click_2018 = mapa_2018.filterBounds(click1).first();
  var click_2019 = mapa_2019.filterBounds(click1).first();
  var click_2020 = mapa_2020.filterBounds(click1).first();
  var click_2021 = mapa_2021.filterBounds(click1).first();
  var click_2022 = mapa_2022.filterBounds(click1).first();

var grafMancha = ui.Chart.feature.byProperty({features: [click_2017,click_2018,click_2019,click_2020,click_2021,click_2022], 
                                             xProperties:'area', 
                                              seriesProperty: 'ano'});

grafMancha = grafMancha.setChartType('ColumnChart');
grafMancha = grafMancha.setOptions({
    vAxis: {title: 'ÁREA DA MANCHA (em m²)'},
    colors: ["264653","2a9d8f","90be6d","e9c46a","f4a261","e76f51"]
  });

var areanoano = baseDic1[selectorBase1.getValue()][5].filterBounds(click1).first();

var titulo = ui.Label({value: 'INFORMAÇÕES SOBRE A POSSÍVEL ÁREA DE SOLO EXPOSTO SELECIONADA', style:{fontWeight: 'bold',textAlign:'center'}});

var municipio = ui.Label({value: 'MUNICÍPIO: ' + areanoano.get('municipio').getInfo(), style:{padding: '0px 0px 0px 15px'}});
var subpref = ui.Label({value: 'SUBPREFEITURA: ' + areanoano.get('subpref').getInfo(), style:{padding: '0px 0px 0px 15px'}});
var distrito = ui.Label({value: 'DISTRITO: ' + areanoano.get('distrito').getInfo(), style:{padding: '0px 0px 0px 15px'}});

var area = ui.Label({value: 'ÁREA EM '+ areanoano.get('ano').getInfo() + ': '+ areanoano.get('area').getInfo().toFixed(3) + ' m²', style:{padding: '0px 0px 0px 15px'}});

var upPanel = ui.Panel({style:{width:'375px'}});
upPanel.setLayout(ui.Panel.Layout.flow('horizontal',true));
var intTitulo = ui.Label({value:'ÁREA DE MANCHAS QUE INTERSECTAM O PONTO SELECIONADO',style:{fontWeight: 'bold',textAlign:'center', width:'300px'}});
var intButton = ui.Button({label:'ESSA MANCHA INTERSECTA COM OUTRAS EM OUTROS ANOS?', style:{position:'bottom-center',width: '375px'}});
var intVolta = ui.Button({label: 'VER INFORMAÇÕES ANTERIORES',
                          imageUrl:'https://www.gstatic.com/images/icons/material/system/1x/arrow_back_black_24dp.png'
});

intButton.onClick(function(click){
  panelIndividual.clear();
  upPanel.clear();
  upPanel.add(intVolta);
  upPanel.add(intTitulo);
  panelIndividual.add(upPanel);
  panelIndividual.add(grafMancha);
});

intVolta.onClick(function(click){
  panelIndividual.clear();
  panelIndividual = panelIndividual.add(titulo);
  panelIndividual = panelIndividual.add(area);
  panelIndividual = panelIndividual.add(municipio);
  panelIndividual = panelIndividual.add(subpref);
  panelIndividual = panelIndividual.add(distrito);
  panelIndividual = panelIndividual.add(intButton);
});

panelIndividual = panelIndividual.add(titulo);
panelIndividual = panelIndividual.add(area);
panelIndividual = panelIndividual.add(municipio);
panelIndividual = panelIndividual.add(subpref);
panelIndividual = panelIndividual.add(distrito);
panelIndividual = panelIndividual.add(intButton);
}
leftMap.add(panelIndividual);
leftMap.onClick(handleMapClick);
});


var buttonPanel = ui.Panel({style:{position: 'bottom-left', width:'255px'}});
var buttonPanel1 = ui.Panel({style:{position: 'bottom-left', width:'245px',padding:'0px'}});
var buttonPanel2 = ui.Panel({style:{position: 'bottom-left', width:'245px',padding:'0px'}});
var buttonPanel3 = ui.Panel({style:{position: 'bottom-left', width:'245px',padding:'0px'}});
buttonPanel3.setLayout(ui.Panel.Layout.flow('horizontal'));
var buttonPanel4 = ui.Panel({style:{position: 'bottom-left', width:'245px',padding:'0px'}});

var voltarInvest = ui.Button({label:'PARAR DE INVESTIGAR',style:{width:'180px', color:'#c73f18'}});

voltarInvest.onClick(function(click){
  panelIndividual.clear();
  leftMap.remove(panelIndividual);
  buttonPanel3.remove(voltarInvest);
  buttonPanel3.add(buttonInd);
});

voltarArea.onClick(function(click){
  leftMap.remove(graphPanelAT);
  buttonPanel1.remove(voltarArea);
  buttonPanel1.add(buttonAT);
});

buttonAT.onClick(function(click){
  leftMap.onClick('');
  leftMap.remove(graphPanelMun);
  leftMap.remove(panelIndividual);
  
  graphPanelAT.clear();
  panelIndividual.clear();
  graphPanelMun.clear();
  
  var graphTitulo = ui.Label({value:'TOTAL DE POSSÍVEIS ÁREAS DE SOLO EXPOSTO NA RMSP POR ANO (em m²)',style:{fontWeight: 'bold',textAlign:'center'}});
  var grafAreaAno = ui.Chart.feature.byFeature({features: areaTotalAno,
                                            xProperty: 'ano_String', 
                                            yProperties:'Área Total'
});

var options1 = {
  colors: ['#015f63']
};
grafAreaAno.setChartType('ColumnChart').setOptions(options1);
graphPanelAT.add(graphTitulo);
graphPanelAT.add(grafAreaAno);
leftMap.add(graphPanelAT);

buttonPanel1.remove(buttonAT);
buttonPanel1.add(voltarArea);
});



voltarCidade.onClick(function(click){
  leftMap.remove(graphPanelMun);
  buttonPanel2.remove(voltarCidade);
  buttonPanel2.add(buttonSelect);
});

buttonSelect.onChange(function(select){
  leftMap.onClick('');
  leftMap.remove(graphPanelAT);
  leftMap.remove(panelIndividual);
  
  graphPanelAT.clear();
  panelIndividual.clear();
  graphPanelMun.clear();
  leftMap.centerObject(RMSP_0.filter(ee.Filter.eq('SEM_ACENTO',dicCid[select][0])));

var graphTitulo = ui.Label({value:'TOTAL DE POSSÍVEIS ÁREAS DE SOLO EXPOSTO EM ' + dicCid[select][1] + ' POR ANO (em m²)',style:{fontWeight: 'bold',textAlign:'center'}});


  var featCol = areaPorMun.filter(ee.Filter.eq('municipio', dicCid[select][0]));
  var municipio = dicCid[select][0];
  var grafMun = ui.Chart.feature.byProperty({features: featCol,
                                            xProperties: ['Área em 2017', 'Área em 2018','Área em 2019','Área em 2021','Área em 2022'],
                                            seriesProperty: 'Áreas Possíveis de solo exposto'
});
  var options2 = {
  colors: ['#c73f18'],
  width: 300,
};
grafMun.setChartType('ColumnChart').setOptions(options2);
buttonPanel2.remove(buttonSelect);
graphPanelMun.add(graphTitulo);
graphPanelMun.add(grafMun);
leftMap.add(graphPanelMun);
buttonPanel2.add(voltarCidade);

});


var investPanel = ui.Panel({style:{width:'255px', position: 'bottom-left'}});
investPanel.setLayout(ui.Panel.Layout.flow('horizontal',false));
var investButton = ui.Button({label: 'investigar áreas', style:{backgroundColor:'#c73f18'}, 
                           imageUrl:'https://www.gstatic.com/images/icons/material/system/1x/search_white_24dp.png'});
var fecharPainel = ui.Button({label:'FECHAR PAINEL DE INVESTIGAÇÃO',style:{backgroundColor:'#c73f18'},
                          imageUrl:'https://www.gstatic.com/images/icons/material/system/1x/arrow_back_white_24dp.png'
});

fecharPainel.onClick(function(click){
  leftMap.remove(graphPanelAT);
  leftMap.remove(graphPanelMun);
  leftMap.remove(buttonPanel);
  leftMap.remove(panelIndividual);
  leftMap.add(investPanel);
});

var investLabel = ui.Label({value:'INVESTIGAR POSSÍVEIS ÁREAS DE SOLO EXPOSTO', style:{fontSize:'13px',width:'180px',textAlign:'center', fontWeight:'bold'}});
investPanel.add(investButton);
investPanel.add(investLabel);
leftMap.add(investPanel);

investButton.onClick(function(click){
  buttonPanel1.clear();
  buttonPanel2.clear();
  buttonPanel3.clear();
  buttonPanel4.clear();
  buttonPanel.clear();
  panelIndividual.clear();
  
  buttonPanel1.add(buttonAT);
  buttonPanel2.add(buttonSelect);
  buttonPanel3.add(fecharPainel);
  buttonPanel3.add(buttonInd);
  
  buttonPanel.add(buttonPanel4);
  buttonPanel.add(buttonPanel1);
  buttonPanel.add(buttonPanel2);
  buttonPanel.add(buttonPanel3);
  
  leftMap.add(buttonPanel);
  leftMap.remove(investPanel);
});






// PEQUENA DESCRIÇÃO
var labelDESCR1 = ui.Label({value:'Mapa de possíveis áreas de solo exposto na Região Metropolitana de São Paulo.', 
                            style:{textAlign:'center', fontSize: '12px'}});
var labelDESCR2 = ui.Label({value:'Mapa de possíveis áreas de solo exposto na Região Metropolitana de São Paulo.', 
                            style:{textAlign:'center', fontSize: '12px'}});

// BOTÕES DE MAIS INFORMAÇÕES
var panelInfo1 = ui.Panel({style:{width:'230px'}});
panelInfo1.setLayout(ui.Panel.Layout.flow('horizontal'));
var panelInfo2 = ui.Panel({style:{width:'230px'}});
panelInfo2.setLayout(ui.Panel.Layout.flow('horizontal'));

var buttonExpand1 = ui.Button({label: 'expandir', style:{position:'top-center', textAlign: 'center'}, 
                           imageUrl:'https://www.gstatic.com/images/icons/material/system/1x/expand_circle_down_black_24dp.png'});
var buttonExpand2 = ui.Button({label: 'expandir', style:{position:'top-center', textAlign: 'center'}, 
                           imageUrl:'https://www.gstatic.com/images/icons/material/system/1x/expand_circle_down_black_24dp.png'});

var buttonInfo1 = ui.Button({label: 'informações', style:{position:'top-center', textAlign: 'center'}, 
                           imageUrl:'https://www.gstatic.com/images/icons/material/system/1x/info_black_24dp.png'});
var buttonInfo2 = ui.Button({label: 'informações', style:{position:'top-center', textAlign: 'center'}, 
                           imageUrl:'https://www.gstatic.com/images/icons/material/system/1x/info_black_24dp.png'});

var buttonContact1 = ui.Button({label: 'contato', style:{position:'top-center', textAlign: 'center'}, 
                           imageUrl:'https://www.gstatic.com/images/icons/material/system/1x/live_help_black_24dp.png'});
var buttonContact2 = ui.Button({label: 'contato', style:{position:'top-center', textAlign: 'center'}, 
                           imageUrl:'https://www.gstatic.com/images/icons/material/system/1x/live_help_black_24dp.png'});

var buttonClose1 = ui.Button({label: 'ler mais', style:{position:'top-center', textAlign: 'center'}, 
                           imageUrl:'https://www.gstatic.com/images/icons/material/system/1x/arrow_circle_up_black_24dp.png'});
var buttonClose2 = ui.Button({label: 'ler mais', style:{position:'top-center', textAlign: 'center'}, 
                           imageUrl:'https://www.gstatic.com/images/icons/material/system/1x/arrow_circle_up_black_24dp.png'});

logoPanel1.add(thumb1);
logoPanel1.add(labelDESCR1);

panelInfo1.add(buttonExpand1);
panelInfo1.add(buttonInfo1);
panelInfo1.add(buttonContact1);
panelInfo1.add(buttonClose1);

logoPanel1.add(panelInfo1);
//leftMap.add(logoPanel1);

logoPanel2.add(thumb2);
logoPanel2.add(labelDESCR2);

panelInfo2.add(buttonExpand2);
panelInfo2.add(buttonInfo2);
panelInfo2.add(buttonContact2);
panelInfo2.add(buttonClose2);

logoPanel2.add(panelInfo2);
rightMap.add(logoPanel2);

var panelExp = ui.Panel({style:{width:'240px'}});
var panelExp2 = ui.Panel({style:{width:'240px'}});
//panelExp.setLayout(ui.Panel.Layout.flow({direction:'horizontal',wrap: false}));

// CONFIGURAÇÃO DO FUNCIONAMENTO DOS BOTÕES
buttonExpand1.onClick(function(click){
  logoPanel1.remove(panelExp);
  logoPanel1.add(panelExp);
  
    var labelExp = ui.Label({value:'Áreas mapeadas utilizando a plataforma Google Earth Engine e imagens Planet, Sentinel e Landsat.', 
                style:{fontSize: '12px', width:'225px',textAlign:'center'}});
    var labelLink = ui.Label({value: 'Baixe os arquivos em .SHP aqui',style:{fontSize: '12px', width:'225px',textAlign:'center'},targetUrl:'https://www.kaggle.com/datasets/juliacansado/solo-exposto/download?datasetVersionNumber=1'});
  panelExp.clear();
  panelExp.add(labelExp);
  panelExp.add(labelLink);
});

buttonInfo1.onClick(function(click){
  logoPanel1.remove(panelExp);
  logoPanel1.add(panelExp);
  
    var labelInfo = ui.Label({value:'Parte do Trabalho Final de Graduação de Júlia Ascencio Cansado, uma aluna tentando se formar em Arquitetura e Urbanismo na Universidade de São Paulo, julho de 2023.', 
                style:{fontSize: '12px', width:'225px',textAlign:'center'}});
    var labelLink = ui.Label({value: 'Saiba mais sobre o projeto neste link',style:{fontSize: '12px', width:'225px',textAlign:'center'},targetUrl:'https://juliacansado.github.io/SOLO-EXPOSTO/index.html'});
  panelExp.clear();
  panelExp.add(labelInfo);
  panelExp.add(labelLink);
});

buttonContact1.onClick(function(click){
  logoPanel1.remove(panelExp);
  logoPanel1.add(panelExp);
  
    var labelCont = ui.Label({value:'Qualquer dúvida entrar em contato com julia.cansado@usp.br (em breve @alumni.usp.br, se tudo der certo!)', 
                style:{fontSize: '12px', width:'225px',textAlign:'center'}});
  
  panelExp.clear();
  panelExp.add(labelCont);
});

buttonClose1.onClick(function(click){
  panelExp.clear();
  logoPanel1.remove(panelExp);
  
});


buttonExpand2.onClick(function(click){
  logoPanel2.remove(panelExp2);
  logoPanel2.add(panelExp2);
  
    var labelExp = ui.Label({value:'Áreas mapeadas utilizando a plataforma Google Earth Engine e imagens Planet, Sentinel e Landsat.', 
                style:{fontSize: '12px', width:'225px',textAlign:'center'}});
    var labelLink = ui.Label({value: 'Baixe os arquivos em .SHP aqui',style:{fontSize: '12px', width:'225px',textAlign:'center'},targetUrl:'https://www.kaggle.com/datasets/juliacansado/solo-exposto/download?datasetVersionNumber=1'});

  panelExp2.clear();
  panelExp2.add(labelExp);
  panelExp2.add(labelLink)
});

buttonInfo2.onClick(function(click){
  logoPanel2.remove(panelExp2);
  logoPanel2.add(panelExp2);
  
    var labelInfo = ui.Label({value:'Parte do Trabalho Final de Graduação de Júlia Ascencio Cansado, uma aluna tentando se formar em Arquitetura e Urbanismo na Universidade de São Paulo, julho de 2023.', 
                style:{fontSize: '12px', width:'225px',textAlign:'center'}});
    var labelLink = ui.Label({value: 'Saiba mais sobre o projeto neste link',style:{fontSize: '12px', width:'225px',textAlign:'center'},targetUrl:'https://juliacansado.github.io/SOLO-EXPOSTO/index.html'});
  panelExp2.clear();
  panelExp2.add(labelInfo);
  panelExp2.add(labelLink);
});

buttonContact2.onClick(function(click){
  logoPanel2.remove(panelExp2);
  logoPanel2.add(panelExp2);
  
    var labelCont = ui.Label({value:'Qualquer dúvida entrar em contato com julia.cansado@usp.br (em breve @alumni.usp.br, se tudo der certo!)', 
                style:{fontSize: '12px', width:'225px',textAlign:'center'}});
  
  panelExp2.clear();
  panelExp2.add(labelCont);
});

buttonClose2.onClick(function(click){
  panelExp2.clear();
  logoPanel2.remove(panelExp2);
  
});


//LABELS YEARS
// var panelYear1 = ui.Panel({style:{width:'75px',position:'top-left', backgroundColor: '#ffffff'}});
// var panelYear2 = ui.Panel({style:{width:'75px',position:'top-right', backgroundColor: '#ffffff'}});
// var label2017 = ui.Label({value: '2017', style:{fontWeight: 'bold', fontSize:'20px', color:'#c73f18',backgroundColor: '#ffffff'}});
// var label2022 = ui.Label({value: '2022', style:{fontWeight: 'bold', fontSize:'20px', color:'#c73f18', backgroundColor: '#ffffff'}});

// panelYear1.add(label2017);
// panelYear2.add(label2022);
// leftMap.add(panelYear1);
// rightMap.add(panelYear2);



//"POLAROID" creation
// var panelBorda0 = ui.Panel({style:{width:'20px', height: '612px'}});
// leftMap.add(panelBorda0);

// var panelBorda1 = ui.Panel({style:{width:'500px', height: '20px'}});
// leftMap.add(panelBorda1);

// var panelBorda2 = ui.Panel({style:{width:'20px', height: '612px'}});
// leftMap.add(panelBorda2);

// var panelBorda3 = ui.Panel({style:{width:'540px', height: '200px',position:'bottom-center'}});
// leftMap.add(panelBorda3);


// MENU GEOMETRIAS
var panelGeom = ui.Panel({style:{width:'255px', position:'bottom-right', padding: '5px 0px 0px 18px'}});
var labelGeom = ui.Label({value:'VISUALIZAÇÃO DE GEOMETRIAS',style:{textAlign:'center', fontWeight:'bold'}});

//RMSP
var RMSP_check = ui.Checkbox({label: 'Municípios RMSP', style:{padding:'0px 0px 0px 35px'}});
RMSP_check.onChange(function(check){
  leftMap.layers().get(5).setShown(check);
  rightMap.layers().get(5).setShown(check);
});

// DISTRITOS
var DIST_check = ui.Checkbox({label: 'Distritos SP', style:{padding:'0px 0px 10px 35px'}});
DIST_check.onChange(function(check){
  leftMap.layers().get(6).setShown(check);
  rightMap.layers().get(6).setShown(check);
});

//SUBPREFEITURAS
var SUB_check = ui.Checkbox({label: 'Subprefeituras SP', style:{padding:'0px 0px 0px 35px'}});
SUB_check.onChange(function(check){
  leftMap.layers().get(7).setShown(check);
  rightMap.layers().get(7).setShown(check);
});

panelGeom.add(labelGeom);
panelGeom.add(RMSP_check);
panelGeom.add(SUB_check);
panelGeom.add(DIST_check);
rightMap.add(panelGeom);


// Add our split panel to the root panel.
ui.root.add(splitSet);

var linker = ui.Map.Linker([leftMap, rightMap]);


