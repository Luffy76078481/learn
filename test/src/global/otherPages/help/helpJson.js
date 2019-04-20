/**
 * 
 */
import React from 'react';
import {config} from "globalConfig";

export function renderProfile() {
    var ret = "";
    if (config.spec === "bet365") {
        ret = "Bet365是世界领先的网络博彩集团之一，提供体育投注、金融、娱乐场、扑克牌及游戏等丰富选择。我们向客户提供全部体育范围内的丰富投注，内容涵盖足球、网球、篮球、斯诺克及乒乓球等。此外，您还可以使用网球过关投注奖金尽享ATP网球顶级赛事带来的众多诱人投注机会。您可同时通过手机或平板电脑访问“移动中的Bet365”，体验一系列同样精彩诱人的赛事及盘口，包括现场滚球盘服务。";
    }else if(config.spec === "xpj-asa"){
        ret ="新葡京娱乐场已取得了菲律宾政府唯一认可的发牌及监管单位First Cagayan Leisure Resort Corporation(FCLRC)和 Cagayan Economic Zone Authority(CEZA)联合颁发的网络博彩游戏运营牌照。新葡京娱乐场严格按照这些管理机构发布的规则进行运营。";
    }else if(config.spec ==="dafa-dbb"){
        ret="亞洲領先在線投註網站，為您呈現不一樣的在線投註體驗，包括體育投註，在線娛樂場，真人娛樂場遊戲，在線撲克，老虎機遊戲和更多世界頂級投註遊戲"
    }else if(config.spec ==="dafa-bt6" || config.spec ==="dafa-ldl"){
        ret="亞洲領先在線投註網站，為您呈現不一樣的在線投註體驗，包括體育投註，在線娛樂場，真人娛樂場遊戲，在線撲克，老虎機遊戲和更多世界頂級投註遊戲"
    }else if(config.spec ==="jinsha"){
        ret="品牌信誉-首选「金沙」，最具公信力的博彩公司、更有高质量的游戏平台，金沙赌场为哥斯达黎加合法注册之博彩公司之一。公司不仅拥有市场上最多元化的游戏投注平台，同时为客户提供实时、刺激、高信誉的服务保证、高质量的游戏平台，也是公司的首要宗旨。";
    }else if(config.spec ==="xhKer"){
        ret="品牌信誉-首选「金沙」，最具公信力的博彩公司、更有高质量的游戏平台，金沙赌场为哥斯达黎加合法注册之博彩公司之一。公司不仅拥有市场上最多元化的游戏投注平台，同时为客户提供实时、刺激、高信誉的服务保证、高质量的游戏平台，也是公司的首要宗旨。";
    }else if(config.spec ==="kubo"){
        ret="酷博娱乐城在越来越火热的网络博彩市场中，除了多元化的产品，也是由于公司良好的信誉，以及高质量的'服务' ，获得众多玩家的青睐和喜爱。并获得GEOTRUST国际认证，确保网站公平公正性，所有会员数据均经过加密，保障玩家隐私。简易的作业程序，步骤不在复杂，通过创新提供多元化游戏，为广大客户提供线上娱乐一体化服务。";
    }else if(config.spec ==="yhb"){
        ret="易好博是亚洲领先在线娱乐投注网站，为您呈现不一样的在线投注体验，包括体育投注，在线娱乐场，真人娱乐场游戏，在线扑克，老虎机游 戏和更多世界顶级投注游戏。"
    }else if(config.spec ==="mgm-vv8"){
        ret="美高梅(MGM Macau)为大中华地区领先的娱乐场博彩度假酒店发展商、拥有者和运营商之一，是屡获殊荣的顶级综合博彩度假酒店，于2007年与亚洲最大博彩软件提供商进行技术合作，正式进军网络博彩业，成立【澳门美高梅娱乐场】在线博彩网站。在越来越热络的网络博彩市场中，美高梅不断地求新求变，寻找最新的创意，秉持最好的服务。带给客户高质量的服务、产品、娱乐，以及提供更多元化的游戏产品，是我们企业永恒不变的宗旨。"
    }else if(config.spec ==="vns-vn2"){
        ret="威尼斯人与“CT” “GPI” “LEBO” “AG” “OG” “BBIN” “MG” 进行技术合作，共同打造高质量游戏平台，目前拥有哥斯特黎加合法注册之博彩公司。我们一切博彩营业行为皆遵从哥斯特黎加政府博彩条约。 我们在越来越热的网络博彩市场中，不断地求新求变，寻找最新的创意，秉持最好的服务。以带给广大游戏玩家高质量的服务、产品、娱乐，是我们企业永恒的宗 旨。"
    }else if(config.spec ==="xpj4"){
        ret="新葡京赌场与bbin进行技术合作，共同打造高品质游戏平台，目前拥有哥斯特黎加合法注册之博彩公司。 我们一切博彩营业行为皆遵从哥斯特黎加政府博彩条约。 我们在越来越热络的网路博彩市场中，不断地求新求变，寻找最新的创意，秉持最好的服务。以带给客户高品质的服务、产品、娱乐，是我们的企业永恒宗旨。"
    }else if(config.spec ==="xpj3"){
        ret="澳门新葡京娱乐场在线持牌经营博彩投注多年.是目前世界最大的网络博彩集团之一！持有菲律宾政府卡格扬经济特区 First Cagayan leisure and Resort Corporation颁发的体育博彩与线上赌场执照.网站所提供的所有产品和服务由菲律宾政府卡格扬经济特区First Cagayan leisure and Resort Corporation 所授权和监管.选择我们，您将拥有可靠的资金保障和优势服务.我们对小赌怡情，健康博彩的宗旨非常重视.我们希望客户在投注时获得的快乐。"
    }else if(config.spec ==="kyy"){
        ret="利达国际创办于2008年1月,公司一直致力于品牌策划传播事业,国际赛事贵宾接待及相关娱乐演出等事业;经营:企业形象策划,品牌营销策划,广告代理发布,媒体整合传播旅游发展计划等;我们为全球多个地区提供一体化的服务，客服覆盖亚洲、欧洲、美洲等地，以专业、高效、优质的服务赢得广大客户认可。公司位于菲律宾,汇集一批具有很强的市场洞察力,策划能力及接待经验的专业团队.我们的王牌业务——娱乐演出、国际赛事贵宾接待，为境内外喜爱娱乐演出、国际赛事高端旅行的客户，提供量身定制的全程贵宾接待。这些服务涵盖了名人演唱会、知名体育赛事、电视节、电影节、音乐节、慈善party 等。欢迎携手,共创未来.向世界传播您代表中国的价值,对这一共同的事业我们称之为,创造具有中国精神的世界品牌。"
    }else if(config.spec ==="manbet"){ 
        ret="万博集团总公司成立于1998年，万博集团公司行业涉及房地产，商务，制造业，贸易，投资，旅游等多个产业及新加坡，马来西亚,文莱,澳门，印尼，菲律宾以及东南亚多个国家和地区实体办公室和综合业务。万博集团是以东南亚万博实业总集团的强大实力为背景依托，由集团的优秀的高素质人才资源与业界高质量精英团队合作创办。其中万博集团公司持股65%、管理层持股25%、高级代理商持股10%，万博实业有限公司拥有绝对的控股权。"
    }else if(config.spec ==="gdh"||config.spec ==="vns-uzi"){
        ret="威尼斯人于2007年初正式開拓亞洲市場，被授予“亞洲最受玩家喜愛的博彩品牌”，如今也成為亞洲最具有領導地位的頂級博彩公司。背靠亞洲具代表地位的網絡博彩娛樂集團（BBIN），提供豐富多樣的視訊直播、電子遊藝、體育賽事、及彩票等遊戲產品，逐步建構亞洲最大網絡博彩娛樂事業體"
    }else if(config.spec ==="xhUzi" ||config.spec === "vns"){
        ret="威尼斯人于2007年初正式開拓亞洲市場，被授予“亞洲最受玩家喜愛的博彩品牌”，如今也成為亞洲最具有領導地位的頂級博彩公司。背靠亞洲具代表地位的網絡博彩娛樂集團（BBIN），提供豐富多樣的視訊直播、電子遊藝、體育賽事、及彩票等遊戲產品，逐步建構亞洲最大網絡博彩娛樂事業體"
    }else if(config.spec ==="ybb"){
        ret="万宝集团与亚洲最具代表地位的网络博彩娱乐集团合作技术平台，拥有多元化的产品，如：体育投注、真人娱乐、老虎机、彩票等多种游戏；提供会员最公平、公正、公开的游戏与稳定的系统，让每一位会员都能在最安全的系统环境当中享受最优质的网络娱乐，与最完善的服务品质。安全与信誉保障！万宝集团与最具亚洲网络博彩娱乐集团代表合作技术平台，真人娱乐视频现场持有菲律宾政府核发牌照，现场运营完全依照国际赌场管理条例。于本站注册或是进行任何游戏的投注、操作，玩家使用的账号、密码，全程数据加密，玩家资料不外泄。"
    }else if(config.spec ==="hg"){
        ret="皇冠集团与亚洲最具代表地位的网络博彩娱乐集团合作技术平台，拥有多元化的产品，如：体育投注、真人娱乐、老虎机、彩票等多种游戏；提供会员最公平、公正、公开的游戏与稳定的系统，让每一位会员都能在最安全的系统环境当中享受最优质的网络娱乐，与最完善的服务品质。安全与信誉保障！万宝集团与最具亚洲网络博彩娱乐集团代表合作技术平台，真人娱乐视频现场持有菲律宾政府核发牌照，现场运营完全依照国际赌场管理条例。于本站注册或是进行任何游戏的投注、操作，玩家使用的账号、密码，全程数据加密，玩家资料不外泄。"
    }
    else if(config.spec ==="xhtd-xin"){
        ret="新濠天地与 BBIN 、PT 、AG 、MG 、OG、沙巴、188 、Opus、皇冠、AB、HB、QT、CG、KENO 等近二十家世界顶级游戏方进行技术合作，共同打造品质游戏平台。目前拥有哥斯特黎加合法注册之博彩公司。我们一切博彩营业行为皆遵从哥斯特黎加政府博彩条约。"
    }else if(config.spec ==="xhtd-bt6" || config.spec ==="xhtd-ldl"){
        ret="新濠天地与 BBIN 、PT 、AG 、MG 、OG、沙巴、188 、Opus、皇冠、AB、HB、QT、CG、KENO 等近二十家世界顶级游戏方进行技术合作，共同打造品质游戏平台。目前拥有哥斯特黎加合法注册之博彩公司。我们一切博彩营业行为皆遵从哥斯特黎加政府博彩条约。"
    }else if(config.spec ==="js8"){
        ret="金沙娱乐城是位于澳门新口岸区的一间赌场，美国拉斯维加斯金沙公司属下，总投资逾2.4亿美元，拥有澳门政府发放的博彩牌照，于2004年5月18日开幕。开幕当天吸引了25,000名客人入场，盛况空前。后来，金沙娱乐城成为了到访澳门游客一个新的博彩去处，公司拥有雄厚的经济实力和精英团队，通过自主高效研发，提供稳定，高速，安全的网络游戏平台，为亚洲用户提供最安全最公平的网上投注平台。为了给客户带来更全面更高质量的游戏体验。"
    }else if(config.spec ==="ppp"){
        ret="浦发娱乐为最有实力的娱乐平台，制定个人信息保密制度，并设置多项安全设施。面对客户，我们致力建立双方友善、互信的关系，本公司的客服人员每天24小时、每周7天随时在线提供亲切、专业的协助，为客户解答帐户、存取款等相关问题"
    }else if(config.spec ==="wf8"){
        ret="品牌信誉-首选「万发」，最具公信力的博彩公司、更有高质量的游戏平台。公司不仅拥有市场上最多元化的游戏投注平台，同时为客户提供实时、刺激、高信誉的服务保证、高质量的游戏平台，也是公司的首要宗旨。"
    }else if(config.spec ==="jhgj-jjh"){
        ret="品牌信誉-首选「金豪」，最具公信力的博彩公司、更有高质量的游戏平台。公司不仅拥有市场上最多元化的游戏投注平台，同时为客户提供实时、刺激、高信誉的服务保证、高质量的游戏平台，也是公司的首要宗旨。"
    }else if(config.spec ==="yhwj"){
        ret="壹号赢家创办于2008年1月,公司一直致力于品牌策划传播事业,国际赛事贵宾接待及相关娱乐演出等事业;经营:企业形象策划,品牌营销策划,广告代理发布,媒体整合传播旅游发展计划等;我们为全球多个地区提供一体化的服务，客服覆盖亚洲、欧洲、美洲等地，以专业、高效、优质的服务赢得广大客户认可。公司位于菲律宾,汇集一批具有很强的市场洞察力,策划能力及接待经验的专业团队.我们的王牌业务——娱乐演出、国际赛事贵宾接待，为境内外喜爱娱乐演出、国际赛事高端旅行的客户，提供量身定制的全程贵宾接待。这些服务涵盖了名人演唱会、知名体育赛事、电视节、电影节、音乐节、慈善party 等。欢迎携手,共创未来.向世界传播您代表中国的价值,对这一共同的事业我们称之为,创造具有中国精神的世界品牌。"
    }
    else {
        ret = config.appName+"线上娱乐城由亚洲顶级IT技术团队斥资打造的顶级线上娱乐平台，运营总部位於东南亚的一个群岛国家菲律宾马尼拉，并获得菲律宾政府认证的博彩执照。我们一切博彩营业行为皆遵从菲律宾政府博彩条约。一直秉持诚信可靠，秉持最好服务的企业宗旨为广大游戏爱好者服务，以维护客户以及企业形象。";
    }

    return ret;

}

export  function renderTerms() {
    var ret="";
    if(config.spec === "jinsha") {
        ret = "金沙亚洲（Sands Asia）是位于澳门新口岸的一间赌场，澳门股份有限公司所持有及营运。“金沙(Sands)”这个名字是来源于位于美国内华达州拉斯维加斯的金沙娱乐场。2006年3月，金沙亚洲入选由《福布斯》杂志所选出的全球最热门(Hottest)的13间赌场名单。拥有澳门政府颁发的赌场牌照，是亚洲最具规模且成长最快的娱乐场之一，金沙亚洲线上娱乐场获得菲律宾政府卡格扬经济特区 First Cagayan leisure and Resort Corporation颁发的体育博彩与线上赌场执照 ，接受CEZA和菲律宾政府卡格扬经济特区First Cagayan leisure and Resort Corporation授权和监管，并由北美技术系統测试（TST）认证赔率。作为知名的线上博彩公司，为全球博彩爱好者提供最优惠的赔率和最优质的服务，金沙亚洲的商标是博彩业界的标杆，持有创新的市场概念和有价值观的开价，令金沙亚洲在业界享有最佳声誉,我们的经营理念是通过向我们的顾客提供最佳的博彩娱乐。"
    }else{
        ret="于菲律宾卡格扬自由港(CAGAYAN FREEPORT)受充分许可和规管，提供网上体育博彩（Sportsbook Wagering）和娱乐场博彩(Casino Gambling)服务"
    }

    return ret;
}

export  function renderAllianceTable() {
    if(config.spec === "jinsha"){
        return (
            <table className="tableList" cellPadding="0" cellSpacing="0" >
                <tbody>
                <tr>
                    <td>存款会员数</td>
                    <td>有效投注会员</td>
                    <td>最小公司盈利(&gt;)</td>
                    <td>最大公司盈利(≦)</td>
                    <td>公司盈利佣金比例(%)</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>5</td>
                    <td>1</td>
                    <td>150000</td>
                    <td>30</td>
                </tr>
                <tr>
                    <td>25</td>
                    <td>25</td>
                    <td>150000</td>
                    <td>600000</td>
                    <td>35</td>
                </tr>
                <tr>
                    <td>50</td>
                    <td>50</td>
                    <td>600000</td>
                    <td>1200000</td>
                    <td>40</td>
                </tr>
                <tr>
                    <td>100</td>
                    <td>100</td>
                    <td>1200000</td>
                    <td>12000000</td>
                    <td>45</td>
                </tr>
                </tbody>
            </table>
        )
    }else if(config.spec === "gdh"||config.spec === "vns-uzi"||config.spec === "mgm-vv8"){
        return(
            <table className="tableList" cellPadding="0" cellSpacing="0" rules="none">
            <tbody>
                <tr>
                    <td>当月盈利</td>
                    <td>退佣比例</td>
                    <td>利润计算</td>
                </tr>
                <tr>
                    <td>1~4.999万</td>
                    <td>50%</td>
                    <td>24500（按4万9计算）</td>
                </tr>
                <tr>
                    <td>5~9.999万</td>
                    <td>55%</td>
                    <td>54450（按9万9计算）</td>
                </tr>
                <tr>
                    <td>10~19.999万</td>
                    <td>60%</td>
                    <td>119400（按19.9万计算）</td>
                </tr>
            </tbody>
            </table>
        )
    }else if(config.spec =="ybb"){
        return(
            <table className="tableList" cellPadding="0" cellSpacing="0" >
                <tbody>
                <tr>
                    <td className="table-title">当月净损益</td>
                    <td className="table-title">当月最低有效会员</td>
                    <td className="table-title">球类运动</td>
                    <td className="table-title">真人视讯</td>
                    <td className="table-title">电子机率</td>
                    <td className="table-title">彩票</td>
                </tr>
                <tr>
                    <td>1 ~ 50,000</td>
                    <td>5名或以上</td>
                    <td>25%</td>
                    <td>25%</td>
                    <td>25%</td>
                    <td>0.1%</td>
                </tr>
                <tr>
                    <td>50,001 ~ 300,000</td>
                    <td>10名或以上</td>
                    <td>30%</td>
                    <td>30%</td>
                    <td>30%</td>
                    <td>0.1%</td>
                </tr>
                <tr>
                    <td>300,001 ~ 800,000</td>
                    <td>20名或以上</td>
                    <td>35%</td>
                    <td>35%</td>
                    <td>35%</td>
                    <td>0.1%</td>
                </tr>
                <tr>
                    <td>800,001 ~ 1,000,000</td>
                    <td>30名或以上</td>
                    <td>40%</td>
                    <td>40%</td>
                    <td>40%</td>
                    <td>0.1%</td>
                </tr>
                <tr>
                    <td>1,000,001以上</td>
                    <td>50名或以上</td>
                    <td>45%</td>
                    <td>45%</td>
                    <td>45%</td>
                    <td>0.1%</td>
                </tr>
                </tbody>
            </table>
        )
    }else if(config.spec =="hg"){
        return(
            <table className="tableList" cellPadding="0" cellSpacing="0" >
                <tbody>
                <tr>
                    <td className="table-title">当月净损益</td>
                    <td className="table-title">当月最低有效会员</td>
                    <td className="table-title">球类运动</td>
                    <td className="table-title">真人视讯</td>
                    <td className="table-title">电子机率</td>
                    <td className="table-title">彩票</td>
                </tr>
                <tr>
                    <td>1 ~ 50,000</td>
                    <td>5名或以上</td>
                    <td>25%</td>
                    <td>25%</td>
                    <td>25%</td>
                    <td>0.1%</td>
                </tr>
                <tr>
                    <td>50,001 ~ 300,000</td>
                    <td>10名或以上</td>
                    <td>30%</td>
                    <td>30%</td>
                    <td>30%</td>
                    <td>0.1%</td>
                </tr>
                <tr>
                    <td>300,001 ~ 800,000</td>
                    <td>20名或以上</td>
                    <td>35%</td>
                    <td>35%</td>
                    <td>35%</td>
                    <td>0.1%</td>
                </tr>
                <tr>
                    <td>800,001 ~ 1,000,000</td>
                    <td>30名或以上</td>
                    <td>40%</td>
                    <td>40%</td>
                    <td>40%</td>
                    <td>0.1%</td>
                </tr>
                <tr>
                    <td>1,000,001以上</td>
                    <td>50名或以上</td>
                    <td>45%</td>
                    <td>45%</td>
                    <td>45%</td>
                    <td>0.1%</td>
                </tr>
                </tbody>
            </table>
        )
    }else if(config.spec === "xhtd-bt6" || config.spec === "xhtd-ldl" || config.spec === "xhtd-xhtd"){
        return(
            <table className="tableList" cellPadding="0" cellSpacing="0">
                <tbody>
                    <tr>
                        <td>当月盈利</td>
                        <td>当月退佣比例</td>
                        <td>佣金</td>
                    </tr>
                    <tr>
                        <td>1 - 4.9万</td>
                        <td>50%</td>
                        <td>24500（按4.9万计算）</td>
                    </tr>
                    <tr>
                        <td>5 - 9.9万</td>
                        <td>55%</td>
                        <td>54450（按9.9万计算）</td>
                    </tr>
                    <tr>
                        <td>10 - 19.9万</td>
                        <td>60%</td>
                        <td>119400（按19.9万计算）</td>
                    </tr>
                </tbody>
            </table>
        )
    }else if(config.spec === "wf8"){
        return (
            <table className="tableList" cellPadding="0" cellSpacing="0" >
                <tbody>
                <tr>
                    <td>最小公司盈利(＜)</td>
                    <td>最大公司盈利(≦)</td>
                    <td>公司盈利佣金比例(%)</td>
                    <td>存款会员数</td>
                    <td>投注会员数（有效投注＞＝）</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>50001</td>
                    <td>25</td>
                    <td>5</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>50001</td>
                    <td>150001</td>
                    <td>30</td>
                    <td>10</td>
                    <td>10</td>
                </tr>
                <tr>
                    <td>150001</td>
                    <td>300001</td>
                    <td>35</td>
                    <td>15</td>
                    <td>15</td>
                </tr>
                <tr>
                    <td>300001</td>
                    <td>12000000</td>
                    <td>40</td>
                    <td>20</td>
                    <td>20</td>
                </tr>
                </tbody>
            </table>
        )
    }else if(config.spec === "mgm"){
        return (
            <table className="tableList" cellPadding="0" cellSpacing="0" >
                <tbody>
                <tr>
                    <td>当月盈利</td>
                    <td>退佣比例</td>
                    <td>利润计算</td>
                </tr>
                <tr>
                    <td>1~4.9999 万</td>
                    <td>50%</td>
                    <td>24500 （按 4 万 9 计算）</td>
                </tr>
                <tr>
                    <td>5~9.9999 万</td>
                    <td>55%</td>
                    <td>54450 （按 9 万 9 计算）</td>
                </tr>
                <tr>
                    <td>10~19.9999 万</td>
                    <td>60%</td>
                    <td>119400 （按 19.9 万 计算）</td>
                </tr>
                </tbody>
            </table>
        )
    }
    else {
        return (
            <table className="tableList" cellPadding="0" cellSpacing="0" >
                <tbody>
                <tr>
                    <td>存款会员数</td>
                    <td>有效投注会员</td>
                    <td>最小公司盈利(&gt;)</td>
                    <td>最大公司盈利(≦)</td>
                    <td>公司盈利佣金比例(%)</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>5</td>
                    <td>1</td>
                    <td>150000</td>
                    <td>25</td>
                </tr>
                <tr>
                    <td>25</td>
                    <td>25</td>
                    <td>150000</td>
                    <td>600000</td>
                    <td>30</td>
                </tr>
                <tr>
                    <td>50</td>
                    <td>50</td>
                    <td>600000</td>
                    <td>1200000</td>
                    <td>35</td>
                </tr>
                <tr>
                    <td>100</td>
                    <td>100</td>
                    <td>1200000</td>
                    <td>12000000</td>
                    <td>40</td>
                </tr>
                </tbody>
            </table>
        )
    }

}

export  function rederAllianceTable2() {
    if(config.spec=="ybb"){
        return(
            <table className="tableList" cellPadding="0" cellSpacing="0" >
                <tbody>
                <tr>
                    <td className="table-title">视讯</td>
                    <td className="table-title">体育</td>
                    <td className="table-title">电子</td>
                    <td className="table-title">彩票</td>
                </tr>
                <tr>
                    <td>25%</td>
                    <td>25%</td>
                    <td>25%</td>
                    <td>0.1%</td>
                </tr>
                </tbody>
            </table>
        )
    } else if(config.spec=="hg"){
        return(
            <table className="tableList" cellPadding="0" cellSpacing="0" >
                <tbody>
                <tr>
                    <td className="table-title">视讯</td>
                    <td className="table-title">体育</td>
                    <td className="table-title">电子</td>
                    <td className="table-title">彩票</td>
                </tr>
                <tr>
                    <td>25%</td>
                    <td>25%</td>
                    <td>25%</td>
                    <td>0.1%</td>
                </tr>
                </tbody>
            </table>
        )
    } else {
        return(
            <table className="tableList" cellPadding="0" cellSpacing="0" >
                <tbody>
                <tr>
                    <td className="table-title">视讯</td>
                    <td className="table-title">体育</td>
                    <td className="table-title">电子</td>
                    <td className="table-title">彩票</td>
                </tr>
                <tr>
                    <td>25%</td>
                    <td>25%</td>
                    <td>25%</td>
                    <td>0.1%</td>
                </tr>
                </tbody>
            </table>
        )
    }

}
export function renderToolTitle() {

    if(config.spec =="kyy"){
        return(<h3 className="f35 juzhong heiti font300" style={{ paddingBottom: '20px'}}>私人定制</h3>)

    }else {
        return(<h3 className="f35 juzhong heiti font300" style={{ paddingBottom: '20px'}}>给力的优惠活动</h3>
        )
    }

}

export function render_tittxt() {

    if(config.spec =="xhtd"){
        return(
            <div className="txt">
                {/*<span style={{lineHeight: "35px",fontWeight:"700"}}>公平公正</span><br/>*/}
                <span>在越来越热络的网络博彩市场中，我们不断求新求变，寻找最新的创意，秉持最好的服务，以带给客户高品质的服务、产品、娱乐，是我们的企业永恒宗旨。</span><br/><br/>
                <span style={{lineHeight: "35px",fontWeight:"700"}}>公平、公正、公开</span><br/>
                <span>我们的体育博彩拥有顶级的盘房操盘，投入大量的人力以及资源，提高完整赛事，丰富玩法给热爱体育的玩家。
                    真人视讯游戏拥有经国际赌场专业训练的荷官，进行各种赌场游戏，所有赌局都依荷官动作，而不是预设的电脑机率结果，
                    以高科技的网络直播技术，带给玩家身历赌场的刺激经验！各式彩票游戏，是依官方赛果产生游戏结果，让玩家在活波的投注介面，
                    享受最公正的娱乐。而我们的电子游戏使用最公平的乱数产生机率，让玩家安心享受多元的娱乐性游戏。新濠天地所有的游戏皆有共同的优点：
                    无须下载、介面操作简易、功能齐全、画面精致、游戏秉持公平、公正、公开！</span><br/><br/>
                <span style={{lineHeight: "35px",fontWeight:"700"}}>客户至上</span><br/>
                <span>在市场上众多的博彩网站中，玩家选择新濠天地，除了多元化的产品，也是因为新濠天地拥有良好的信誉，
                    以及高品质的服务，我们的用心随处可见，诺顿分级评级新濠天地为安全网站，绝无任何恶意软体，并获得 GEOTRUST 国际认证，
                    确保网站公平公正性，所有会员资料均经过加密，保障玩家隐私。新濠天地以服务会员不打烊的精神，24小时处理会员出入款相关事宜，
                    令我们骄傲的客服团队，亲切又专业，解决玩家对于网站、游戏的种种疑难杂症，让每位玩家有宾至如归的感觉！
                    我们自豪的以业界最强的各种优惠方式回馈我们的会员，新濠天地绝对是玩家最明智的选择！</span><br/>
            </div>
        )

    }else {
        return(
            <div className="txt">
                <span style={{lineHeight: "35px",fontWeight:"700"}}>公平公正</span><br/>
                <span>是我们最基本的宗旨。我们采用最具亚洲代表的网络博彩娱乐集团多家国际公司同时使用一套真人游戏系统；给玩家提供绝对公平公正的在线娱乐平台。
                            我们在处理客户的投诉回馈，都秉持着公平公正的基本原则，旨在打造一个客户信赖的娱乐平台。</span><br/><br/>
                <span style={{lineHeight: "35px",fontWeight:"700"}}>诚信专业</span><br/>
                <span>诚信经营是公司的核心宗旨之一，因为只有诚信经营才能赢得客户的信赖和口碑；我们的经营团队具备多年的博彩运营经验，所有的技术团队和客服团队都经过专业的训练，我们以最专业的水平和态度，
                            力求给客户提供安全稳定的游戏平台及优质的客服。</span><br/><br/>
                <span style={{lineHeight: "35px",fontWeight:"700"}}>客户至上</span><br/>
                <span>我们的目标是打造最受玩家欢迎的在线娱乐平台，我们更关心客户的需求和利益。提供24小时专业的客户服务，随时解决客户的咨询及问题。多渠道的与客户互动交流，
                            了解客户的需求，随时关注客户的意见。举办更多的优惠及促销活动，给客户提供更多的回馈及惊喜。</span><br/>
            </div>
        )
    }

}