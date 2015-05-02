#! /usr/local/bin/node

var child = require('child_process');

var CPFGenerator = (function() {
  'use strict';

  var self = {};

  function isValid(numbers) {
    var invalid_numbers = [
      '111111111',
      '222222222',
      '333333333',
      '444444444',
      '555555555',
      '666666666',
      '777777777',
      '888888888',
      '999999999',
      '000000000'
    ];
    
    return (numbers === undefined || invalid_numbers.indexOf(numbers) > -1 || numbers.toString().length < 9) ? false : true;
  }

  function random(max) {
    return Math.floor(Math.random() * (max + 1));
  }
  
  function getNumbers() {
    var numbers = [], i = 9;

    while(i--) {
      numbers.push(random(9));
    }

    return numbers.join('');
  }

  function getVerificationDigits(number) {
    var first, second, sum1, sum2;

    number = number.toString().split('');
    
    function getDigit(sum) {
      sum = sum % 11;
      return (sum < 2) ? 0 : 11 - sum;
    }

    sum1 = number.map(function(val, index) {
        return val * (10 - index);
      }).reduce(function(a, b) {
        return a + b;
      });

    first = getDigit(sum1);

    sum2 = number.concat(first).map(function(val, index) {
        return val * (11 - index);
      }).reduce(function(a, b) {
        return a + b;
      });

    second = getDigit(sum2);

    return [first, second].join('');
  }
  
  self.digits = function(numbers) {
    if (isValid(numbers)) return getVerificationDigits(numbers);
  };
  
  self.make = function(numbers) {
    numbers = numbers || getNumbers();
    if (isValid(numbers)) {
      return [numbers, '-', getVerificationDigits(numbers)].join('');
    } else {
      console.log('Erro: o número deve conter 9 digitos.');
      return null;
    }
  };

  return self;
}());

var arg = (process.argv[2] || '');
var cpf = CPFGenerator.make(arg);

if (cpf !== null) {
  child.exec(
    ("echo \"" + cpf + "\" | tr -d '\n' | pbcopy"),
    function(err, stdout, stderr) {
      if (err) {
        console.log('Não foi possível copiar o CPF \"' + cpf + '\" para a área de transferência.');
        console.log('Erro: ' + stderr);
      } else {
        console.log('==> CPF ' + cpf + ' copiado!');
      }
      process.exit(0);
    }
  );
}
