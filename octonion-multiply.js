/* Operate with octonions in JavaScript */
Array.prototype.add = function(other) {
  let result = [];
  for (let i=0; i<this.length; i++) {
    result.push(this[i] + other[i])
  }
  return result
}
Array.prototype.subtract = function(other) {
  let result = [];
  for (let i=0; i<this.length; i++) {
    result.push(this[i] - other[i])
  }
  return result
}

function conjugate(z) {
  /* Compute conjugate of Cayley-Dickson number.
     Takes array of coefficients
  */
  let z_star = [...z];
  for (let i=1; i<z.length; i++) {
    z_star[i] *= -1;
  }
  return z_star
}

function invert(z) {
  /* Compute inverse of Cayley-Dickson number.
     Takes array of coefficients
  */
  let z_inv = [];
  let z_star = conjugate(z);
  let z_norm = z.map(a => a**2).reduce((a, b) => a + b);
  for (let a of z_star) {
    z_inv.push(a / z_norm);
  }
  return z_inv;
}

function multiplyCayleyDickson(w, z) {
  /* Multiply two Cayley-Dickson numbers
     where w, z are arrays containing the
     coefficients
  */
  let n = z.length;
  if (n === 1) {
    return [w.pop() * z.pop()]
  }

  let m = Math.floor(n / 2);
  let a = w.slice(0, m);
  let b = w.slice(m, n);
  let c = z.slice(0, m);
  let d = z.slice(m, n);
  let ap = [...a];
  let bp = [...b];
  let cp = [...c];
  let dp = [...d];

  return multiplyCayleyDickson(a, c).subtract(
    multiplyCayleyDickson(conjugate(d), b)).concat(
      multiplyCayleyDickson(dp, ap).add(
        multiplyCayleyDickson(bp, conjugate(cp)))
    );

}

class Octonion {

  constructor(coeffs=[]) {
    this.e_0 = coeffs[0];
    this.e_1 = coeffs[1];
    this.e_2 = coeffs[2];
    this.e_3 = coeffs[3];
    this.e_4 = coeffs[4];
    this.e_5 = coeffs[5];
    this.e_6 = coeffs[6];
    this.e_7 = coeffs[7];
  }

  add(other) {
    let result = new Octonion();
    for (let field in this) {
      result[field] =  this[field] + other[field];
    }
    return result
  }

  subtract(other) {
    let result = new Octonion();
    for (let field in this) {
      result[field] =  this[field] - other[field];
    }
    return result
  }

  multiply(other) {
    let result = new Octonion();
    let w = this.getCoeffs();
    let z = other.getCoeffs();
    let result_coeffs = multiplyCayleyDickson(w, z);
    let i = 0;
    for (let field in this) {
      result[field] = result_coeffs[i];
      i++;
    }
    return result
  }

  divide(other) {
    let result = new Octonion();
    let w = this.getCoeffs();
    let z = invert(other.getCoeffs());
    let result_coeffs = multiplyCayleyDickson(w, z);
    let i = 0;
    for (let field in this) {
      result[field] = result_coeffs[i];
      i++;
    }
    return result
  }

  getCoeffs() {
    let number_coeffs = [];
    for (let field in this) {
      number_coeffs.push(this[field]);
    }
    return number_coeffs
  }

}

// Bartok: 6 romanian dances for violin and piano
class CayleyDicksonNumber {

  constructor(coeffs=[], dim=4) {

    if (coeffs.length < 1) {
      for (let i=0; i<dim; i++) {
        coeffs.push(0);
      }
      coeffs[0] = 1;
    }

    for (let i=0; i<coeffs.length;i++) {
      this[`e_${i}`] = coeffs[i];
    }

  }

  add(other) {
    let dim = Object.keys(this).length;
    let result = new CayleyDicksonNumber([], dim);
    for (let field in this) {
      result[field] =  this[field] + other[field];
    }
    return result
  }

  subtract(other) {
    let dim = Object.keys(this).length;
    let result = new CayleyDicksonNumber([], dim);
    for (let field in this) {
      result[field] =  this[field] - other[field];
    }
    return result
  }

  multiply(other) {
    let dim = Object.keys(this).length;
    let result = new CayleyDicksonNumber([], dim);
    let w = this.getCoeffs();
    let z = other.getCoeffs();
    let result_coeffs = multiplyCayleyDickson(w, z);
    let i = 0;
    for (let field in this) {
      result[field] = result_coeffs[i];
      i++;
    }
    return result
  }

  divide(other) {
    let dim = Object.keys(this).length;
    let result = new CayleyDicksonNumber([], dim);
    let w = this.getCoeffs();
    let z = invert(other.getCoeffs());
    let result_coeffs = multiplyCayleyDickson(w, z);
    let i = 0;
    for (let field in this) {
      result[field] = result_coeffs[i];
      i++;
    }
    return result
  }

  getCoeffs() {
    let number_coeffs = [];
    for (let field in this) {
      number_coeffs.push(this[field]);
    }
    return number_coeffs
  }

}

// let o = new Octonion([0,1,0,0,0,0,0,0]);
// let u = new Octonion([0,0,1,0,0,0,0,0]);

// console.log(o.divide(u));
let q = new CayleyDicksonNumber([5]);
let r = new CayleyDicksonNumber([3]);
// console.log(q, r);
console.log(q.multiply(r));
// let p = new CayleyDicksonNumber([1,2,3,4,5,6,7,8]);
// console.log(p);
// let a = new CayleyDicksonNumber([], dim=16);
// let b = new CayleyDicksonNumber([], dim=16);
//console.log(a.divide(b));


//
// let letters = /[a-z]/gi;
// let number = '-1.3 + 1i + 4.2j - 0.4k';
// let signs = /[+-]/gi;
// let digits = /[0-9.]/g;
// let parsed = {};
// console.log(number.match(digits));
// console.log(number.match(signs));
// let components = number.split(signs);
// // console.log(number.split(letters));
// // console.log(components);
// for (component of components) {
//     // console.log(component.search(letters));
//     // console.log(component[component.search(letters)]);
//   // console.log(component);
//   // console.log(component.split(letters));
// }
