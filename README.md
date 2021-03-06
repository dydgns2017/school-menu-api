# 학교급식 API
## 개요 및 특징
GET 요청을 통해 학교 급식을 JSON으로 받아 어떤 플랫폼에서든 쉽게 불러올 수 있습니다.
[school-api](https://github.com/agemor/school-api) 프로젝트가 제작에 큰 도움이 되었습니다.

한 학교로 한 번 이상 요청 시, 그 학교의 메뉴가 메모리에 저장되어 응답 속도가 대폭 개선됩니다.

초등학교, 중학교, 고등학교를 지원합니다.

## 학교 유형
 * 초등학교 <code>elementary</code>
 * 중학교 <code>middle</code>
 * 고등학교 <code>high</code>

## 학교 코드
[여기](https://www.meatwatch.go.kr/biz/bm/sel/schoolListPopup.do)에서 학교 코드를 확인할 수 있습니다.

## 급식 불러오기
<code>https://<span></span>schoolmenukr.<span></span>ml/api/[학교유형]/[학교코드]</code>로 현재 달의 급식을 불러올 수 있습니다. 응답 데이터는 JSON 입니다.

### 매개변수(선택사항)
다음과 같이 주소 끝에 변수명과 값을 적어 사용합니다.

<code>https://<span></span>schoolmenukr.<span></span>ml/api/[학교유형]/[학교코드]<strong>?[변수명1]=[값1]&[변수명2]=[값2]</strong></code>

| 변수명 | 설명 | 기본값 |
| :------: | ------ | ------ |
| year | 특정한 년도를 지정하여 해당 년도에 해당하는 급식을 불러옵니다. | 현재 날짜의 연도 | 
| month | 특정한 달을 지정하여 해당 달에 해당하는 급식을 불러옵니다. | 현재 날짜의 월 |
| date | 특정한 일을 지정하여 해당 날짜에 해당하는 급식을 불러옵니다. | 현재 날짜의 일 |
| hideAllergy | true로 설정 시 알레르기 정보를 감춥니다. | <code>false</code> |

## 예시
 > Node.js
<pre>
const request = require('request');

request('https://schoolmenukr.ml/api/high/X123456789?date=23', (err, res, body) => {
    var json = JSON.parse(body);
    console.log(json);
});
</pre>
 > Python
<pre>
import requests
import json

response = requests.get('https://schoolmenukr.ml/api/middle/X123456789?year=2018&month=5')
meal_menu = json.loads(response.text)
print(meal_menu)
</pre>

### 응답
 <pre>
{
    menu: [
        ...,
        {
            date:"1",
            breakfast:["찹쌀밥","홍합미역국5.6.","닭갈비5.6.13.","김구이13.","배추김치9.13.","방울토마토12."],
            lunch:["흑미밥","콩나물국5.13.","돼지등뼈김치찜9.10.13.","도토리묵무침5.6.13.","총각김치9.13.","청포도"],
            dinner:["찹쌀밥","오징어짬뽕국5.6.","배추겉절이13.","포도쥬스5.13.","만두오꼬노미야끼1.5.6.10.12.13."]
        },
        ...
    ],
    server_message: ["foo", "bar", ...]
}
</pre>

## 저작권
해당 소스를 마음대로 수정하거나 재배포 할 수 있습니다. [자세한 정보](https://namu.wiki/w/MIT%20허가서)