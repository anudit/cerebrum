def trimAdd(_address = '0x0'):
    return '0x'+_address[2:6] + '...' + _address[len(_address)-4:len(_address)]

# print(trimAdd('0xBeb71662FF9c08aFeF3866f85A6591D4aeBE6e4E'))
