'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const parseMenu = require('../modules/parse_menu');
const logger = require('../modules/logger');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.get('/:region/:school_code', (req, res) => {
  var ymd = {
    year: req.query.year,
    month: req.query.month,
    date: req.query.date
  };
  parseMenu(req.params.region, req.params.school_code, ymd, (MONTHLY_TABLE) => {
    MONTHLY_TABLE.push({
      notice: [
        '이제 POST 요청을 지원합니다. 자세한 사항은 문서(https://github.com/5d-jh/school-menu-api-documentation)를 참고하세요.'
      ]
    });

    logger({
      level: 'info',
      method: 'GET',
      optional_var: ymd
    });
  
    res.json(MONTHLY_TABLE);
  });
});

router.post('/', (req, res) => {
  console.log(req.body);
  req.body.ymd = req.body.ymd || {year: '', month: '', date: ''};
  var ymd = {
    year: req.body.ymd.year,
    month: req.body.ymd.month,
    date: req.body.ymd.date
  };
  parseMenu(req.body.region, req.body.school_code, ymd, (MONTHLY_TABLE) => {
    logger({
      level: 'info',
      method: 'POST',
      optional_var: ymd
    });

    res.send(MONTHLY_TABLE);
  });
});

module.exports = router;