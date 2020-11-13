import axios from "./axios";

/**
 *获取连接信息
 * @param {string} mobile 手机号
 */
export function getLink() {
  getLink.url = "/auth/link/getLink";
  return axios({
    url: getLink.url,
    method: "GET",
  });
}
/**
 *添加链接
 * @param {object} linkFileVo 链接对象
 */
export function addOrEditLink(linkFileVo) {
  addOrEditLink.url = "/auth/link/addLink";
  return axios({
    url: addOrEditLink.url,
    method: "POST",
    data: linkFileVo,
  });
}

/**
 *获取会员编号
 * @param {string} mobile 手机号
 */
export function getOwnerNum(mobile) {
  getOwnerNum.url = "/owner/getOwnerNum";
  return axios({
    url: getOwnerNum.url,
    method: "POST",
    data: {
      mobile,
    },
  });
}
/**
 *获取优惠卷信息
 * @param {string}
 */
export function getCoupons() {
  getOwnerNum.url = "/owner/getCoupons";
  return axios({
    url: getOwnerNum.url,
    method: "POST",
    data: {},
  });
}
/**
 *积分兑换规则
 * @param {string}
 */
export function exchangePointRule(ownerNumber) {
  exchangePointRule.url = `/owner/exchangePointRule/${ownerNumber}`;
  return axios({
    url: exchangePointRule.url,
    method: "POST",
    data: {},
  });
}
/**
 *获取积分
 * @param {string}
 */
export function getPoints(mobile, plate) {
  getPoints.url = "/owner/getPoints";
  return axios({
    url: getPoints.url,
    method: "POST",
    data: {
      mobile,
      plate,
    },
  });
}

/**
 *积分兑换
 * @param {string}
 */
export function pointExchange(couponsId, mobile, plate) {
  pointExchange.url = "/owner/pointExchange";
  return axios({
    url: pointExchange.url,
    method: "POST",
    data: {
      couponsId,
      mobile,
      plate,
    },
  });
}
/**
 *查询积分记录
 * @param {string}
 */
export function queryPointExchange(mobile) {
  queryPointExchange.url = "/owner/queryPointExchange";
  return axios({
    url: queryPointExchange.url,
    method: "POST",
    data: {
      mobile,
    },
  });
}
/**
 *登录成功获取用户信息
 * @param {string}
 */
export function getOwnerInfo(mobile) {
  getOwnerInfo.url = `/owner/getOwnerInfo/${mobile}`;
  return axios({
    url: getOwnerInfo.url,
    method: "POST",
    data: {},
  });
}
/**
 *解绑车辆
 * @param {string}
 */
export function unbind(mobile, plate) {
  unbind.url = "/owner/unbind";
  return axios({
    url: unbind.url,
    method: "POST",
    data: {
      mobile,
      plate,
    },
  });
}
/**
 *绑定车辆
 * @param {string}
 */
export function bindingVehicles(mobile, plate) {
  bindingVehicles.url = "/owner/bindingVehicles";
  return axios({
    url: bindingVehicles.url,
    method: "POST",
    data: {
      mobile,
      plate,
    },
  });
}
