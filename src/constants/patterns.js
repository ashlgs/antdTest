// export const URL_PATTERN = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([\?&]\w+=\w*)*$/
export const URL_PATTERN = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
// 内容作者
export const AUTHOR_PATTERN = /^[a-zA-Z\u4e00-\u9fa5]+$/
// 栏目名称
export const CHANNEL_NAME_PATTERN = /^[\u4e00-\u9fa5]{1,4}$/
// 栏目路径
export const CHANNEL_PATH_PATTERN = /[A-Za-z]{1,10}$/
// 广告版位名称
export const ADVERTISING_SPACE_PATTERN = /^[\u4e00-\u9fa5]{1,5}$/
// 消息模板名称
export const MESSAGE_TPL_NAME_PATTERN = /^[\u4e00-\u9fa5]{1,20}$/
// 友情链接
export const FRIEND_LINK_NAME_PATTERN = /^[\u4e00-\u9fa5]{1,6}$/

// 评分组名称
export const SCORE_GROUP_NAME_PATTERN = /^[\u4e00-\u9fa5]{1,4}$/
// 评分文本
export const SCORE_ITEM_TXT_PATTERN = /^[\u4e00-\u9fa5]{1,3}$/
// 会员组名称
export const GROUP_NAME_PATTERN = /^[\u4e00-\u9fa5]{1,4}$/
// 姓名
export const NAME_PATTERN = /^[\u4e00-\u9fa5]{2,4}$/
// 用户名
export const USER_NAME_PATTERN = /^(?!_+$)[a-zA-Z_0-9]{8,20}$/
// 密码
export const PASSWORD_PATTERN = /^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,20}$/
// 昵称
export const NICKNAME_PATTERN = /^[\u4e00-\u9fa5a-zA-Z0-9\-_]{4,20}$/
// 角色名称
export const ROLE_NAME_PATTERN = /^[\u4e00-\u9fa5]{1,5}$/
// 内容类型名称
export const CONTENT_TYPE_PATTERN = /^[\u4e00-\u9fa5]{1,5}$/
// 模型名称
export const MODEL_PATTERN = /^[\u4e00-\u9fa5]{1,4}$/
// 模板前缀
export const MODEL_PREFIX_PATTERN = /^[a-zA-Z_]+$/
// 错误码
export const ERROR_CODE_PATTERN = /^[0-9]+$/
// 字典名称
export const DICT_NAME_PATTERN = /^[\u4e00-\u9fa5]{1,10}$/
// 字典键值
export const DICT_VALUE_PATTERN = /^[A-Za-z_]+$/
// 地区名称
export const AREA_NAME_PATTERN = /^[\u4e00-\u9fa5]{1,10}$/
// 地区全拼
export const AREA_SPELL_PATTERN = /^[A-Za-z_]+$/
// 电话
export const PHONE_PATTERN = /^[0-9]{11}/
// 模型项字段名
export const FIELD_NAME_PATTERN = /^(?!_)[a-zA-Z0-9_]+$/


