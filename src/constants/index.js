import React from "react";
import {Icon} from 'antd';
import {formatMessage} from 'umi-plugin-react/locale';

export const SUCCESS = '0000';
export const NOT_LOGIN = '0401';
export const PATTERN_MOBILE = '^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$';
export const AreaType = [
  {value: 0, name: '国家'}, {value: 1, name: '省/直辖市'}, {value: 2, name: '市/州'}, {value: 3, name: '区/县'}
];
export const DisabledStatus = [{value: 1, name: '正常'}, {value: 2, name: '禁用'}]
export const ImageLinkTarget = {0: '新窗口', 1: '原窗口'}
// 树形结构根节点id
export const TREE_ROOT_ID = '0';
// 模型类型
export const MODEL_TYPE_CHANNEL = '0';
export const MODEL_TYPE_CONTENT = '1';
// 单选
export const Whether = [{value: true, title: '是'}, {value: false, title: '否'}];
// 禁用状态
export const Status = [1,2];
// 模型项 是否独占一行
export const NewLine = [false, true];
// 协议限定
export const Protocol = {http: 'http://', https: 'https://'};
// 文件后缀
export const Suffix = {html: '.html', jhtml: '.jhtml'};
// 文件类型
export const FileType = {IMAGE: 'IMAGE', ATTACH: 'ATTACH', MEDIA: 'MEDIA'};
// DataType
export const DataType = {
  STRING: 0,
  INTEGER: 1,
  FLOAT: 2,
  TEXTAREA: 3,
  DATE: 4,
  SELECT: 5,
  CHECKBOX: 6,
  RADIO:7,
  ATTACHMENT: 8,
  PICTURE: 9,
};

const Constants = {
  description: '学缘网CMS 是东半球最具影响力的内容信息管理系统',
  loginPage: {
    links: [
      {
        key: 'help',
        title: formatMessage({id: 'layout.user.link.help'}),
        href: '',
      },
      {
        key: 'privacy',
        title: formatMessage({id: 'layout.user.link.privacy'}),
        href: '',
      },
      {
        key: 'terms',
        title: formatMessage({id: 'layout.user.link.terms'}),
        href: '',
      },
    ],
  },
  footer: {
    links: [
      {
        key: '学缘网首页',
        title: '学缘网首页',
        href: 'http://www.xueyuanwang.com',
        blankTarget: true,
      },
      {
        key: 'gitlab',
        title: <Icon type="gitlab"/>,
        href: 'http://gitlab.12jieti.com/xuyuan/cms-front',
        blankTarget: true,
      },
      {
        key: '学缘课程',
        title: '学缘课程',
        href: 'https://ant.design',
        blankTarget: true,
      },
    ],
  },
  copyright: '2019 山东学缘网络科技有限公司出品',
};
export default Constants;
