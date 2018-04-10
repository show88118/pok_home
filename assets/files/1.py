#coding:utf8
import json
import requests
f = open("nengli.txt",'r')
c = f.readlines()
f.close()
a = []
pok = [{ "ename": "bulbasaur", "type": "grass|poison", "name": "妙蛙种子", "id": "001" }, { "ename": "ivysaur", "type": "grass|poison", "name": "妙蛙草", "id": "002" }, { "ename": "venusaur", "type": "grass|poison", "name": "妙蛙花", "id": "003" }, { "ename": "charmander", "type": "fire|", "name": "小火龙", "id": "004" }, { "ename": "charmeleon", "type": "fire|", "name": "火恐龙", "id": "005" }, { "ename": "charizard", "type": "fire|fly", "name": "喷火龙", "id": "006" }, { "ename": "squirtle", "type": "water|", "name": "杰尼龟", "id": "007" }, { "ename": "wartortle", "type": "water|", "name": "卡咪龟", "id": "008" }, { "ename": "blastoise", "type": "water|", "name": "水箭龟", "id": "009" }, { "ename": "caterpie", "type": "bug|", "name": "绿毛虫", "id": "010" }, { "ename": "metapod", "type": "bug|", "name": "铁甲蛹", "id": "011" }, { "ename": "butterfree", "type": "bug|fly", "name": "巴大蝴", "id": "012" }, { "ename": "weedle", "type": "bug|poison", "name": "独角虫", "id": "013" }, { "ename": "kakuna", "type": "bug|poison", "name": "铁壳蛹", "id": "014" }, { "ename": "beedrill", "type": "bug|poison", "name": "大针蜂", "id": "015" }, { "ename": "pidgey", "type": "normal|fly", "name": "波波", "id": "016" }, { "ename": "pidgeotto", "type": "normal|fly", "name": "比比鸟", "id": "017" }, { "ename": "pidgeot", "type": "normal|fly", "name": "比雕", "id": "018" }, { "ename": "rattata", "type": "normal|", "name": "小拉达", "id": "019" }, { "ename": "raticate", "type": "normal|", "name": "拉达", "id": "020" }, { "ename": "spearow", "type": "normal|fly", "name": "烈雀", "id": "021" }, { "ename": "fearow", "type": "normal|fly", "name": "大嘴雀", "id": "022" }, { "ename": "ekans", "type": "poison|", "name": "阿柏蛇", "id": "023" }, { "ename": "arbok", "type": "poison|", "name": "阿柏怪", "id": "024" }, { "ename": "pikachu", "type": "electric|", "name": "皮卡丘", "id": "025" }, { "ename": "raichu", "type": "electric|", "name": "雷丘", "id": "026" }, { "ename": "sandshrew", "type": "ground|", "name": "穿山鼠", "id": "027" }, { "ename": "sandslash", "type": "ground|", "name": "穿山王", "id": "028" }, { "ename": "nidoran♀", "type": "poison|", "name": "尼多兰", "id": "029" }, { "ename": "nidorina", "type": "poison|", "name": "尼多娜", "id": "030" }, { "ename": "nidoqueen", "type": "poison|ground", "name": "尼多后", "id": "031" }, { "ename": "nidoran♂", "type": "poison|", "name": "尼多朗", "id": "032" }, { "ename": "nidorino", "type": "poison|", "name": "尼多力诺", "id": "033" }, { "ename": "nidoking", "type": "poison|ground", "name": "尼多王", "id": "034" }, { "ename": "clefairy", "type": "fairy|", "name": "皮皮", "id": "035" }, { "ename": "clefable", "type": "fairy|", "name": "皮可西", "id": "036" }, { "ename": "vulpix", "type": "fire|", "name": "六尾", "id": "037" }, { "ename": "ninetales", "type": "fire|", "name": "九尾", "id": "038" }, { "ename": "jigglypuff", "type": "normal|fairy", "name": "胖丁", "id": "039" }, { "ename": "wigglytuff", "type": "normal|fairy", "name": "胖可丁", "id": "040" }, { "ename": "zubat", "type": "poison|fly", "name": "超音蝠", "id": "041" }, { "ename": "golbat", "type": "poison|fly", "name": "大嘴蝠", "id": "042" }, { "ename": "oddish", "type": "grass|poison", "name": "走路草", "id": "043" }, { "ename": "gloom", "type": "grass|poison", "name": "臭臭花", "id": "044" }, { "ename": "vileplume", "type": "grass|poison", "name": "霸王花", "id": "045" }, { "ename": "paras", "type": "bug|grass", "name": "派拉斯", "id": "046" }, { "ename": "parasect", "type": "bug|grass", "name": "派拉斯特", "id": "047" }, { "ename": "venonat", "type": "bug|poison", "name": "毛球", "id": "048" }, { "ename": "venomoth", "type": "bug|poison", "name": "摩鲁蛾", "id": "049" }, { "ename": "diglett", "type": "ground|", "name": "地鼠", "id": "050" }, { "ename": "dugtrio", "type": "ground|", "name": "三地鼠", "id": "051" }, { "ename": "meowth", "type": "normal|", "name": "喵喵", "id": "052" }, { "ename": "persian", "type": "normal|", "name": "猫老大", "id": "053" }, { "ename": "psyduck", "type": "water|", "name": "可达鸭", "id": "054" }, { "ename": "golduck", "type": "water|", "name": "哥达鸭", "id": "055" }, { "ename": "mankey", "type": "fight|", "name": "猴怪", "id": "056" }, { "ename": "primeape", "type": "fight|", "name": "火暴猴", "id": "057" }, { "ename": "growlithe", "type": "fire|", "name": "卡蒂狗", "id": "058" }, { "ename": "arcanine", "type": "fire|", "name": "风速狗", "id": "059" }, { "ename": "poliwag", "type": "water|", "name": "蚊香蝌蚪", "id": "060" }, { "ename": "poliwhirl", "type": "water|", "name": "蚊香蛙", "id": "061" }, { "ename": "poliwrath", "type": "water|fight", "name": "快泳蛙", "id": "062" }, { "ename": "abra", "type": "psychic|", "name": "凯西", "id": "063" }, { "ename": "kadabra", "type": "psychic|", "name": "勇基拉", "id": "064" }, { "ename": "alakazam", "type": "psychic|", "name": "胡地", "id": "065" }, { "ename": "machop", "type": "fight|", "name": "腕力", "id": "066" }, { "ename": "machoke", "type": "fight|", "name": "豪力", "id": "067" }, { "ename": "machamp", "type": "fight|", "name": "怪力", "id": "068" }, { "ename": "bellsprout", "type": "grass|poison", "name": "喇叭芽", "id": "069" }, { "ename": "weepinbell", "type": "grass|poison", "name": "口呆花", "id": "070" }, { "ename": "victreebel", "type": "grass|poison", "name": "大食花", "id": "071" }, { "ename": "tentacool", "type": "water|poison", "name": "玛瑙水母", "id": "072" }, { "ename": "tentacruel", "type": "water|poison", "name": "毒刺水母", "id": "073" }, { "ename": "geodude", "type": "rock|ground", "name": "小拳石", "id": "074" }, { "ename": "graveler", "type": "rock|ground", "name": "隆隆石", "id": "075" }, { "ename": "golem", "type": "rock|ground", "name": "隆隆岩", "id": "076" }, { "ename": "ponyta", "type": "fire|", "name": "小火马", "id": "077" }, { "ename": "rapidash", "type": "fire|", "name": "烈焰马", "id": "078" }, { "ename": "slowpoke", "type": "water|psychic", "name": "呆呆兽", "id": "079" }, { "ename": "slowbro", "type": "water|psychic", "name": "呆壳兽", "id": "080" }, { "ename": "magnemite", "type": "electric|steel", "name": "小磁怪", "id": "081" }, { "ename": "magneton", "type": "electric|steel", "name": "三合一磁怪", "id": "082" }, { "ename": "farfetch'd", "type": "normal|fly", "name": "大葱鸭", "id": "083" }, { "ename": "doduo", "type": "normal|fly", "name": "嘟嘟", "id": "084" }, { "ename": "dodrio", "type": "normal|fly", "name": "嘟嘟利", "id": "085" }, { "ename": "seel", "type": "water|", "name": "小海狮", "id": "086" }, { "ename": "dewgong", "type": "water|ice", "name": "白海狮", "id": "087" }, { "ename": "grimer", "type": "poison|", "name": "臭泥", "id": "088" }, { "ename": "muk", "type": "poison|", "name": "臭臭泥", "id": "089" }, { "ename": "shellder", "type": "water|", "name": "大舌贝", "id": "090" }, { "ename": "cloyster", "type": "water|ice", "name": "刺甲贝", "id": "091" }, { "ename": "gastly", "type": "ghost|poison", "name": "鬼斯", "id": "092" }, { "ename": "haunter", "type": "ghost|poison", "name": "鬼斯通", "id": "093" }, { "ename": "gengar", "type": "ghost|poison", "name": "耿鬼", "id": "094" }, { "ename": "onix", "type": "rock|ground", "name": "大岩蛇", "id": "095" }, { "ename": "drowzee", "type": "psychic|", "name": "催眠貘", "id": "096" }, { "ename": "hypno", "type": "psychic|", "name": "引梦貘人", "id": "097" }, { "ename": "krabby", "type": "water|", "name": "大钳蟹", "id": "098" }, { "ename": "kingler", "type": "water|", "name": "巨钳蟹", "id": "099" }, { "ename": "voltorb", "type": "electric|", "name": "雷电球", "id": "100" }, { "ename": "electrode", "type": "electric|", "name": "顽皮弹", "id": "101" }, { "ename": "exeggcute", "type": "grass|psychic", "name": "蛋蛋", "id": "102" }, { "ename": "exeggutor", "type": "grass|psychic", "name": "椰蛋树", "id": "103" }, { "ename": "cubone", "type": "ground|", "name": "卡拉卡拉", "id": "104" }, { "ename": "marowak", "type": "ground|", "name": "嘎啦嘎啦", "id": "105" }, { "ename": "hitmonlee", "type": "fight|", "name": "沙瓦郎", "id": "106" }, { "ename": "hitmonchan", "type": "fight|", "name": "艾比郎", "id": "107" }, { "ename": "lickitung", "type": "normal|", "name": "大舌头", "id": "108" }, { "ename": "koffing", "type": "poison|", "name": "瓦斯弹", "id": "109" }, { "ename": "weezing", "type": "poison|", "name": "双弹瓦斯", "id": "110" }, { "ename": "rhyhorn", "type": "ground|rock", "name": "独角犀牛", "id": "111" }, { "ename": "rhydon", "type": "ground|rock", "name": "钻角犀兽", "id": "112" }, { "ename": "chansey", "type": "normal|", "name": "吉利蛋", "id": "113" }, { "ename": "tangela", "type": "grass|", "name": "蔓藤怪", "id": "114" }, { "ename": "kangaskhan", "type": "normal|", "name": "袋兽", "id": "115" }, { "ename": "horsea", "type": "water|", "name": "墨海马", "id": "116" }, { "ename": "seadra", "type": "water|", "name": "海刺龙", "id": "117" }, { "ename": "goldeen", "type": "water|", "name": "角金鱼", "id": "118" }, { "ename": "seaking", "type": "water|", "name": "金鱼王", "id": "119" }, { "ename": "staryu", "type": "water|", "name": "海星星", "id": "120" }, { "ename": "starmie", "type": "water|psychic", "name": "宝石海星", "id": "121" }, { "ename": "mr. mime", "type": "psychic|fairy", "name": "吸盘魔偶", "id": "122" }, { "ename": "scyther", "type": "bug|fly", "name": "飞天螳螂", "id": "123" }, { "ename": "jynx", "type": "ice|psychic", "name": "迷唇姐", "id": "124" }, { "ename": "electabuzz", "type": "electric|", "name": "电击兽", "id": "125" }, { "ename": "magmar", "type": "fire|", "name": "鸭嘴火龙", "id": "126" }, { "ename": "pinsir", "type": "bug|", "name": "凯罗斯", "id": "127" }, { "ename": "tauros", "type": "normal|", "name": "肯泰罗", "id": "128" }, { "ename": "magikarp", "type": "water|", "name": "鲤鱼王", "id": "129" }, { "ename": "gyarados", "type": "water|fly", "name": "暴鲤龙", "id": "130" }, { "ename": "lapras", "type": "water|ice", "name": "乘龙", "id": "131" }, { "ename": "ditto", "type": "normal|", "name": "百变怪", "id": "132" }, { "ename": "eevee", "type": "normal|", "name": "伊布", "id": "133" }, { "ename": "vaporeon", "type": "water|", "name": "水伊布", "id": "134" }, { "ename": "jolteon", "type": "electric|", "name": "雷伊布", "id": "135" }, { "ename": "flareon", "type": "fire|", "name": "火伊布", "id": "136" }, { "ename": "porygon", "type": "normal|", "name": "3D龙", "id": "137" }, { "ename": "omanyte", "type": "rock|water", "name": "菊石兽", "id": "138" }, { "ename": "omastar", "type": "rock|water", "name": "多刺菊石兽", "id": "139" }, { "ename": "kabuto", "type": "rock|water", "name": "化石盔", "id": "140" }, { "ename": "kabutops", "type": "rock|water", "name": "镰刀盔", "id": "141" }, { "ename": "aerodactyl", "type": "rock|fly", "name": "化石翼龙", "id": "142" }, { "ename": "snorlax", "type": "normal|", "name": "卡比兽", "id": "143" }, { "ename": "articuno", "type": "ice|fly", "name": "急冻鸟", "id": "144" }, { "ename": "zapdos", "type": "electric|fly", "name": "闪电鸟", "id": "145" }, { "ename": "moltres", "type": "fire|fly", "name": "火焰鸟", "id": "146" }, { "ename": "dratini", "type": "dragon|", "name": "迷你龙", "id": "147" }, { "ename": "dragonair", "type": "dragon|", "name": "哈克龙", "id": "148" }, { "ename": "dragonite", "type": "dragon|fly", "name": "快龙", "id": "149" }, { "ename": "mewtwo", "type": "psychic|", "name": "超梦", "id": "150" }, { "ename": "mew", "type": "psychic|", "name": "梦幻", "id": "151" }]
for idx,i in enumerate(pok):
    i["hp"]=int(c[idx].split("\t")[0].strip())
    i["att"]=int(c[idx].split("\t")[1].strip())
    i["def"]=int(c[idx].split("\t")[2].strip())
    i["speed"]=int(c[idx].split("\t")[3].strip())
print json.dumps(pok, encoding='UTF-8', ensure_ascii=False)
##for idx,i in enumerate(c):
##    #print i.split('\t')[1].decode("utf8")
##    if idx < 151:
##        id = i.split('\t')[0]
##        name = i.split('\t')[1].decode("utf8").strip()
##        ename = i.split('\t')[2]
##        type = i.split('\t')[3].strip()+"|"+i.split('\t')[4].strip()
##        a.append(dict(id=id,name=name,type=type,ename=ename))
##result = json.dumps(a, encoding='UTF-8', ensure_ascii=False)
##print result
    
##f1=open("a.txt","a")
##f1.write(result.encode("utf8"))
##f1.close()


##for idx,i in enumerate(c):
##    id = str(idx+1+721)
##    if len(id) == 1:
##        id = "00"+str(id)
##    elif len(id) == 2:
##        id = "0"+str(id)
##    else:
##        id = str(id)
##    name = i.split('\t')[2]
##    face_url = "https://play.pokemonshowdown.com/sprites/xyani/%s.gif" %name
##    back_url = "https://play.pokemonshowdown.com/sprites/xyani-back/%s.gif" %name
##    r1 = requests.get(face_url)
##    r2 = requests.get(back_url)
##    if r1.status_code == 200:
##        open("gif\/"+id+'_face.gif', 'wb').write(r1.content)
##    else:
##        print id
##    if r2.status_code == 200:
##        open("gif\/"+id+'_back.gif', 'wb').write(r2.content)    


##for i in range(649):
##    url = "https://play.pokemonshowdown.com/sprites/bwicons/%s.png" %str(i+1)
##    r1 = requests.get(url)
##    id = str(i+1)
##    if len(id) == 1:
##        id = "00"+str(id)
##    elif len(id) == 2:
##        id = "0"+str(id)
##    else:
##        id = str(id)
##    if r1.status_code == 200:
##        open("mini\/"+id+'.png', 'wb').write(r1.content)
##    else:
##        print id
