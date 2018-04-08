#coding:utf8
import json
import requests
f = open("pok_idx.txt",'r')
c = f.readlines()
f.close()
a = []

for idx,i in enumerate(c):
    #print i.split('\t')[1].decode("utf8")
    if idx < 151:
        id = i.split('\t')[0]
        name = i.split('\t')[1].decode("utf8").strip()
        type = i.split('\t')[3].strip()+"|"+i.split('\t')[4].strip()
        a.append(dict(id=id,name=name,type=type))
result = json.dumps(a, encoding='UTF-8', ensure_ascii=False)
print result
    
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
