import {
    HomeOutlined,
    MailOutlined,
    ShoppingOutlined,
    BarsOutlined,
    AppstoreAddOutlined,
    AppstoreOutlined,
    PartitionOutlined,
    BlockOutlined,
    ProfileOutlined,
    RedEnvelopeOutlined,
    TagsOutlined,
    StarOutlined,
    CrownOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DownOutlined,
    SearchOutlined,
    ContainerOutlined
} from '@ant-design/icons-vue';
const icons = {
    HomeOutlined,
    MailOutlined,
    ShoppingOutlined,
    BarsOutlined,
    AppstoreAddOutlined,
    AppstoreOutlined,
    PartitionOutlined,
    BlockOutlined,
    ProfileOutlined,
    RedEnvelopeOutlined,
    TagsOutlined,
    StarOutlined,
    CrownOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DownOutlined,
    SearchOutlined ,
    ContainerOutlined}
export default {
    install(app:any){
        for (const iconsKey in icons) {
            // @ts-ignore
            app.component(iconsKey,icons[iconsKey])
        }
    }
}
