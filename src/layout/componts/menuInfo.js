const menuInfo = [
    {
        'parentIcon': 'shopping-outlined',

        "children": [
            "bars-outlined", "appstore-add-outlined", "appstore-outlined", "partition-outlined", "block-outlined"
        ],
        "router":['product','addProduct','productCate','productAttr','brand'],
        'parentName':'商品',
        'childNavName':['商品列表','添加商品',"商品分类","商品类型",'品牌管理']
    },
    {
        'parentIcon': 'profile-outlined',
        "children": [
            "bars-outlined", "appstore-add-outlined", "appstore-outlined", "partition-outlined", "block-outlined"
        ],
        "router":['order','orderSetting','returnApply','returnReason'],
        'parentName':'订单',
        'childNavName':['订单列表',"订单设置","退货申请处理",'退货原因设置']
    },
    {
        'parentIcon': 'red-envelope-outlined',
        "children": [
            "bars-outlined", "appstore-add-outlined", "appstore-outlined", "partition-outlined", "block-outlined",
            "star-outlined","crown-outlined"
        ],
        "router":['flash','coupon','brand','new','hot','subject','advertise'],
        'parentName':'营销',
        'childNavName':['秒杀活动列表',"优惠券列表","品牌推荐",'新品推荐',
            '人气推荐',"专题推荐","广告列表"]
    }, {
        'parentIcon': 'tags-outlined',
        "children": [
            "bars-outlined", "appstore-add-outlined", "appstore-outlined", "partition-outlined", "block-outlined"
        ],
        "router":   ['admin','role','menu','resource'],
        'parentName':'权限',
        'childNavName':['用户列表',"角色列表","菜单列表",'资源列表']
    }
]

export default menuInfo
