var test = require('../../test');

// 1. Given two strings, determine whether they are anagrams.
/**
 * Determine whether two strings are anagrams
 * @param  {String}  a First string
 * @param  {String}  b Second string
 * @return {Boolean}   Whether a and b are anagrams
 */
function isAnagram(a, b) {
  if (a.length !== b.length) return false;
  var map = {};
  for (var i in a) {
    map[a[i]] = map[a[i]] ? map[a[i]] + 1 : 1;
  }
  for (var i in b) {
    if (!map[b[i]]) return false;
    map[b[i]]--;
  }
  for (var letter in map) {
    if (map[letter] !== 0) return false;
  }
  return true;
}

// 2. Given a list of strings, return a list of lists of strings
// representing the list grouping strings gy whether they are
// anagrams of one another.
/**
 * Group the anagram strings in a given list into a list of lists
 * @param  {String[]} strings An array of strings
 * @return {String[][]}       An array of arrays of anagram strings
 */
function mutualAnagrams(strings) {
  if (!strings || strings.length === 0) return [];
  var anagramLists = [];
  for (var i = 0; i < strings.length; i++) {
    var str = strings[i];
    var done = false;
    for (var j = 0; j < anagramLists.length; j++) {
      if (isAnagram(str, anagramLists[j][0])) {
        anagramLists[j].push(str);
        done = true;
        break;
      }
    }
    if (!done) {
      anagramLists.push([str]);
    }
  }
  return anagramLists;
}

test.test(isAnagram, [
  [['', ''], true],
  [['a', 'a'], true],
  [['ab', 'ba'], true],
  [['abc', 'cab'], true],
  [['ab', 'bb'], false],
  [['aab', 'ab'], false],
  [['cabbac', 'aabbcc'], true],
  [['cabbacc', 'abcabca'], false]
].map(test.makeCaseFromArray));

test.test(mutualAnagrams, [
  [[[]], []],
  [[['a']], [['a']]],
  [[['ab', 'ba']], [['ab', 'ba']]],
  [
    [['a', 'ab', 'ba', 'abc', 'cab', 'welp', 'a', 'plew', 'bca']],
    [['a', 'a'], ['ab', 'ba'], ['abc', 'cab', 'bca'], ['welp', 'plew']]
  ]
].map(test.makeCaseFromArray));
