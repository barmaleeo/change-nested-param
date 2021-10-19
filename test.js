import index from "./src";

const chai = require('chai');

const object = {
    stableKey:{secondStableKey:{a:5, b:4, c:3}},
    firstKey:{secondKey:[
        {a:15, b:14, c:13},
        {a:25, b:24, c:23},
        {a:35, b:34, c:33},
        {thirdKey:12, b:44, c:43},
        {a:55, b:54, c:53},
    ]}
}
it('Должен измениться объект c callback и все объекты по пути', () => {
    const result = index(object, 'firstKey.secondKey.3.thirdKey', 27, {callback:(obj, key)=>{
            obj[key+'Old'] = obj[key];
            obj[key] = 27;
            obj[key+'Change'] = true;
        }});
    chai.expect(result).not.equal(object)
    chai.expect(result.stableKey.secondStableKey).equal(object.stableKey.secondStableKey)
    chai.expect(result.stableKey).equal(object.stableKey)
    chai.expect(result.firstKey).not.equal(object.firstKey)
    chai.expect(result.firstKey.secondKey).not.equal(object.firstKey.secondKey)
    chai.expect(result.firstKey.secondKey[2]).equal(object.firstKey.secondKey[2])
    chai.expect(result.firstKey.secondKey[4]).equal(object.firstKey.secondKey[4])
    chai.expect(result.firstKey.secondKey[3]).not.equal(object.firstKey.secondKey[3])
    chai.expect(result.firstKey.secondKey[3].b).equal(object.firstKey.secondKey[3].b)
    chai.expect(result.firstKey.secondKey[3].c).equal(object.firstKey.secondKey[3].c)
    chai.expect(result.firstKey.secondKey[3].thirdKey).equal(27)
    chai.expect(result.firstKey.secondKey[3].thirdKeyOld).equal(12)
    chai.expect(result.firstKey.secondKey[3].thirdKeyChange).equal(true)
});


it('Должен вставиться объект в указанное место  в массиве', () => {
    let result = index(object, 'firstKey.secondKey.+2', {insertedAt: 2},
        {createUndefined: true});
    chai.expect(result).to.deep.equal( {
        stableKey:{secondStableKey:{a:5, b:4, c:3}},
        firstKey:{secondKey:[
                {a:15, b:14, c:13},
                {a:25, b:24, c:23},
                {insertedAt: 2},
                {a:35, b:34, c:33},
                {thirdKey:12, b:44, c:43},
                {a:55, b:54, c:53},
            ]}})
});

it('Должен удалиться объект с указанным индексом в массиве', () => {
    let obj = {firstKey:[[
            {
                deletingInnerContent:39}
        ], [
            {
                secondKey:[{thirdKey:31},{thirdKey:27},{thirdKey:43}],
                immutableKey:[{thirdKey:45},{thirdKey:22},{thirdKey:12}],
            }
        ]
        ]}
    let result = index(obj, 'firstKey.-0.0.-secondKey', null,
        {createUndefined: true});
    chai.expect(result).to.deep.equal({firstKey:[[
            {
                secondKey:[{thirdKey:31},{thirdKey:27},{thirdKey:43}],
                immutableKey:[{thirdKey:45},{thirdKey:22},{thirdKey:12}],
            }
        ]]})


    chai.expect(result).not.equal(obj);


    result = index(obj, 'firstKey.-1.0.-secondKey', null,
        {createUndefined: true});
    chai.expect(result).to.deep.equal({firstKey:[[{deletingInnerContent:39}]
        ]})

    chai.expect(result).not.equal(obj);

    result = index(obj, 'firstKey.-1', null,
        {createUndefined: true});
    chai.expect(result).to.deep.equal({firstKey:[[{deletingInnerContent:39}]
        ]})

    chai.expect(result).not.equal(obj);

})
it('Не должен удаляться объект с указанным индексом если индекс за массивом', () => {
    let obj = {firstKey:[[{secondKey:[{thirdKey:31},{thirdKey:27},{thirdKey:43}]}]]}
    let result = index(obj, 'firstKey.0.0.secondKey.-10', null,
        {createUndefined: true});
    chai.expect(result).equal(obj);

})

it('Должен удаляться объект с указанным индексом из массива с в конце', () => {
    let obj = {firstKey:[[{secondKey:[{thirdKey:31},{thirdKey:27},{thirdKey:43}]}]]}
    let result = index(obj, 'firstKey.0.0.secondKey.-1', null,
        {createUndefined: true});
    chai.expect(result).to.deep.equal({firstKey:[[{secondKey:[{thirdKey:31},{thirdKey:43}]}]]})
    chai.expect(result).not.equal(obj);

    obj = {firstKey:[[{secondKey:[{thirdKey:31},{thirdKey:27},{thirdKey:43}]}]]}
    result = index(obj, 'firstKey.0.0.secondKey.-0', null,
        {createUndefined: true});
    chai.expect(result).to.deep.equal({firstKey:[[{secondKey:[{thirdKey:27},{thirdKey:43}]}]]})
    chai.expect(result).not.equal(obj);
})


it('Должен создаться новый объект с двумя вложенными массивами и массивом в конце', () => {
    const obj = {}
    const result = index(obj, 'firstKey.0.0.secondKey.2', {thirdKey:27},
        {createUndefined:true});
    chai.expect(result).to.deep.equal({firstKey:[[{secondKey:[{thirdKey:27}]}]]})
    chai.expect(result).not.equal(obj);

    const resultInsertBefore = index(result, 'firstKey.0.0.secondKey.*', {thirdKey:31},
        {createUndefined:true});
    chai.expect(resultInsertBefore).to.deep.equal({firstKey:[[{secondKey:[{thirdKey:31},{thirdKey:27}]}]]});
    chai.expect(resultInsertBefore).not.equal(result);

    const resultInsertAfter = index(resultInsertBefore, 'firstKey.0.0.secondKey.5', {thirdKey:43},
        {createUndefined:true});
    chai.expect(resultInsertAfter).to.deep.equal({firstKey:[[{secondKey:[{thirdKey:31},{thirdKey:27},{thirdKey:43}]}]]})
    chai.expect(resultInsertAfter).not.equal(resultInsertBefore);

    const resultReplace = index(resultInsertAfter, 'firstKey.0.0.secondKey.1', {thirdKey:58},
        {createUndefined:true});
    chai.expect(resultReplace).to.deep.equal({firstKey:[[{secondKey:[{thirdKey:31},{thirdKey:58},{thirdKey:43}]}]]})
    chai.expect(resultReplace).not.equal(resultInsertAfter);
});

it('Должен создаться новый объект с двумя вложенными массивами', () => {
    const obj = {}
    const result = index(obj, 'firstKey.0.0.secondKey.thirdKey', 27,
        {createUndefined:true});
    chai.expect(result).to.deep.equal({firstKey:[[{secondKey:{thirdKey:27}}]]})
    chai.expect(result).not.equal(obj);
});

it('Должен создаться новый объект с массивом', () => {
    const obj = {}
    const result = index(obj, 'firstKey.0.secondKey', 27,
        {createUndefined:true});
    chai.expect(result).to.deep.equal({firstKey:[{secondKey:27}]})
    chai.expect(result).not.equal(obj);
});


it('Должен измениться объект и все объекты по пути', () => {
    const result = index(object, 'firstKey.secondKey.3.thirdKey', 27);
    chai.expect(result).not.equal(object)
    chai.expect(result.stableKey.secondStableKey).equal(object.stableKey.secondStableKey)
    chai.expect(result.stableKey).equal(object.stableKey)
    chai.expect(result.firstKey).not.equal(object.firstKey)
    chai.expect(result.firstKey.secondKey).not.equal(object.firstKey.secondKey)
    chai.expect(result.firstKey.secondKey[2]).equal(object.firstKey.secondKey[2])
    chai.expect(result.firstKey.secondKey[4]).equal(object.firstKey.secondKey[4])
    chai.expect(result.firstKey.secondKey[3]).not.equal(object.firstKey.secondKey[3])
    chai.expect(result.firstKey.secondKey[3].b).equal(object.firstKey.secondKey[3].b)
    chai.expect(result.firstKey.secondKey[3].c).equal(object.firstKey.secondKey[3].c)
});

it('Должен измениться существующий ключ', () => {
    const obj = JSON.parse(JSON.stringify(object))
    const result = index(obj, 'firstKey.secondKey.3.thirdKey', 27);
    chai.expect(result.firstKey.secondKey[3]).to.deep.equal({thirdKey:27, b:44, c:43})
    const obj1 = JSON.parse(JSON.stringify(object))

    obj1.firstKey.secondKey[3].thirdKey = 27;
    chai.expect(result).to.deep.equal(obj1);
});

it('Должен измениться существующий ключ с валидацией', () => {
    let obj = JSON.parse(JSON.stringify(object))
    let result = index(obj, 'firstKey.secondKey.3.thirdKey', 27, {valid: true});
    chai.expect(result.firstKey.secondKey[3]).to.deep.equal({thirdKey:27, b:44, c:43, valid: true})

    obj = JSON.parse(JSON.stringify(object))
    result = index(obj, 'firstKey.secondKey.3.thirdKey', 27, {nameValid: true});
    chai.expect(result.firstKey.secondKey[3]).to.deep.equal({thirdKey:27, b:44, c:43, thirdKeyValid: true});
});

it('Должен вернуться неизмененным если не нашелся элемент массива ', () => {
    const obj = JSON.parse(JSON.stringify(object))
    const result = index(obj, 'firstKey.secondKey.1000.thirdKey', 27);
    chai.expect(result).equal(obj)

});

it('Должен вставиться в массив', () => {
    let obj = JSON.parse(JSON.stringify(object))
    let result = index(obj, 'firstKey.secondKey.1000.thirdKey', 27, {createUndefined: true});
    chai.expect(result.firstKey.secondKey[5]).to.deep.equal({thirdKey:27})
});

it('вылетает при неправильном первом ключе', () => {
    const obj = JSON.parse(JSON.stringify(object))
    const result = index(obj, 'firstkey.secondKey.4.thirdKey', 27);
    chai.expect(result).to.deep.equal(obj);
    chai.expect(result).to.deep.equal(object);
    chai.expect(result).equal(obj);
});

it('вылетает без ключа', () => {
    const obj = JSON.parse(JSON.stringify(object))
    const result = index(obj, null, 27);
    chai.expect(result).equal(obj);
    chai.expect(result).to.deep.equal(obj);
    chai.expect(result).to.deep.equal(object);
});

