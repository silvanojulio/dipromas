var express = require('express');
var router = express.Router();
const axios = require('axios');
var HTMLParser = require('node-html-parser');

/* GET articulo by id */
router.get('/', function(req, res, next) {

  axios({
      method: 'get',
      url: 'http://www.dipromas.com.ar/popup.php?id_produ='+req.query.id,      
    }
  )
  .then(response => {
    
    const html = HTMLParser.parse(response.data);

    var articulo = {
      titulo: html.querySelector('.tit-productos').innerHTML,
      codigo: html.querySelector('.listadoMarcas').childNodes[0].innerHTML,
      descripcion: html.querySelectorAll('.listadoMarcas')[2].innerHTML,
      urlImagen: html.querySelectorAll('img')[2].rawAttributes.src
    }

    res.send({
      error: false,
      mensaje: '',
      articulo
    });

  })
  .catch(error => {

    res.send({
      error: true,
      mensaje: ''
    });
  });


  
});

module.exports = router;
