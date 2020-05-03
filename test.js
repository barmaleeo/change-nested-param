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

