# api

## 规则说明

示例：

```js
/**
 * 获取积分
 * @param {string} plate 车牌号
 */
export function getPoints(plate) {
  getPoints.url = "/owner/getPoints";
  return axios({
    url: getPoints.url,
    method: "POST",
    params: { plate },
  });
}
```

每条 api 请求的 url 单独编写是为了缓存数据，减少非必要请求。
