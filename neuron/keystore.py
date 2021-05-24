def setKeystoreData(_key, _value):
    new_state = getKeystoreData()
    new_state[_key] = _value
    with open(".keystore", "w") as fobj:
        for key, val in new_state.items():
            fobj.write(f"{key}={val}\n")
    print('.keystore updated')

def getKeystoreData():
    file1 = open(".keystore", "r")
    lines = file1.readlines()
    keystoreData = {}
    for line in lines:
        line = line.strip().split('=')
        keystoreData[line[0]] = line[1]
    return keystoreData

def setPublicKey(_newPublicKey):
    setKeystoreData('PUBLIC_KEY', _newPublicKey)

def setHostName(_newPublicKey):
    setKeystoreData('HOST_NAME', _newPublicKey)

def checkKeystore():
    if ('PUBLIC_KEY' in getKeystoreData() and 'HOST_NAME' in getKeystoreData()):
        return True
    else:
        return False
