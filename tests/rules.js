/* eslint-env mocha */
var assert = require('assert');
var scss2sass = require('../index');

describe('Rule Conversion', function () {
  describe('Handling "enabled" and "severity"', function () {
    it('rule enabled by default with neither "enabled" nor "severity"', function () {
      assert.deepStrictEqual(
        scss2sass.convert({
          linters: {
            'BorderZero': { convention: 'none' }
          }
        }).rules,
        { 'border-zero': [1, { convention: 'none' }] }
      );
    });

    it('rule enabled by default with "enabled" but not "severity"', function () {
      assert.deepStrictEqual(
        scss2sass.convert({
          linters: {
            'BorderZero': { enabled: true, convention: 'none' }
          }
        }).rules,
        { 'border-zero': [1, { convention: 'none' }] }
      );

      assert.deepStrictEqual(
        scss2sass.convert({
          linters: {
            'BorderZero': { enabled: false, convention: 'none' }
          }
        }).rules,
        { 'border-zero': [0, { convention: 'none' }] }
      );
    });

    it('rule enabled by default with "severity" but not "enabled"', function () {
      assert.deepStrictEqual(
        scss2sass.convert({
          linters: {
            'BorderZero': { severity: 'warning', convention: 'none' }
          }
        }).rules,
        { 'border-zero': [1, { convention: 'none' }] }
      );

      assert.deepStrictEqual(
        scss2sass.convert({
          linters: {
            'BorderZero': { severity: 'error', convention: 'none' }
          }
        }).rules,
        { 'border-zero': [2, { convention: 'none' }] }
      );
    });

    it('rule enabled by default with "enabled" and "severity"', function () {
      assert.deepStrictEqual(
        scss2sass.convert({
          linters: {
            'BorderZero': { enabled: true, severity: 'warning', convention: 'none' }
          }
        }).rules,
        { 'border-zero': [1, { convention: 'none' }] }
      );

      assert.deepStrictEqual(
        scss2sass.convert({
          linters: {
            'BorderZero': { enabled: false, severity: 'warning', convention: 'none' }
          }
        }).rules,
        { 'border-zero': [0, { convention: 'none' }] }
      );

      assert.deepStrictEqual(
        scss2sass.convert({
          linters: {
            'BorderZero': { enabled: true, severity: 'error', convention: 'none' }
          }
        }).rules,
        { 'border-zero': [2, { convention: 'none' }] }
      );

      assert.deepStrictEqual(
        scss2sass.convert({
          linters: {
            'BorderZero': { enabled: false, severity: 'error', convention: 'none' }
          }
        }).rules,
        { 'border-zero': [0, { convention: 'none' }] }
      );
    });

    it('rule disabled by default with neither "enabled" nor "severity"', function () {
      assert.deepStrictEqual(
        scss2sass.convert({
          linters: {
            'VariableForProperty': { properties: ['font-family'] }
          }
        }).rules,
        { 'variable-for-property': [0, { properties: ['font-family'] }] }
      );
    });

    it('rule disabled by default with "enabled" but not "severity"', function () {
      assert.deepStrictEqual(
        scss2sass.convert({
          linters: {
            'VariableForProperty': { enabled: true, properties: ['font-family'] }
          }
        }).rules,
        { 'variable-for-property': [1, { properties: ['font-family'] }] }
      );

      assert.deepStrictEqual(
        scss2sass.convert({
          linters: {
            'VariableForProperty': { enabled: false, properties: ['font-family'] }
          }
        }).rules,
        { 'variable-for-property': [0, { properties: ['font-family'] }] }
      );
    });

    it('rule disabled by default with "severity" but not "enabled"', function () {
      assert.deepStrictEqual(
        scss2sass.convert({
          linters: {
            'VariableForProperty': { severity: 'warning', properties: ['font-family'] }
          }
        }).rules,
        { 'variable-for-property': [0, { properties: ['font-family'] }] }
      );

      assert.deepStrictEqual(
        scss2sass.convert({
          linters: {
            'VariableForProperty': { severity: 'error', properties: ['font-family'] }
          }
        }).rules,
        { 'variable-for-property': [0, { properties: ['font-family'] }] }
      );
    });

    it('rule disabled by default with "enabled" and "severity"', function () {
      assert.deepStrictEqual(
        scss2sass.convert({
          linters: {
            'VariableForProperty': { enabled: true, severity: 'warning', properties: ['font-family'] }
          }
        }).rules,
        { 'variable-for-property': [1, { properties: ['font-family'] }] }
      );

      assert.deepStrictEqual(
        scss2sass.convert({
          linters: {
            'VariableForProperty': { enabled: false, severity: 'warning', properties: ['font-family'] }
          }
        }).rules,
        { 'variable-for-property': [0, { properties: ['font-family'] }] }
      );

      assert.deepStrictEqual(
        scss2sass.convert({
          linters: {
            'VariableForProperty': { enabled: true, severity: 'error', properties: ['font-family'] }
          }
        }).rules,
        { 'variable-for-property': [2, { properties: ['font-family'] }] }
      );

      assert.deepStrictEqual(
        scss2sass.convert({
          linters: {
            'VariableForProperty': { enabled: false, severity: 'error', properties: ['font-family'] }
          }
        }).rules,
        { 'variable-for-property': [0, { properties: ['font-family'] }] }
      );
    });
  });

  it('BangFormat', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'BangFormat': { enabled: false }
        }
      }).rules,
      {
        'space-after-bang': 0,
        'space-before-bang': 0
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'BangFormat': { enabled: true }
        }
      }).rules,
      {
        'space-after-bang': [1, { include: false }],
        'space-before-bang': [1, { include: true }]
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'BangFormat': { enabled: true, space_after_bang: true, space_before_bang: false }
        }
      }).rules,
      {
        'space-after-bang': [1, { include: true }],
        'space-before-bang': [1, { include: false }]
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'BangFormat': { enabled: true, space_after_bang: false, space_before_bang: true }
        }
      }).rules,
      {
        'space-after-bang': [1, { include: false }],
        'space-before-bang': [1, { include: true }]
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'BangFormat': { enabled: true, space_after_bang: false, space_before_bang: false }
        }
      }).rules,
      {
        'space-after-bang': [1, { include: false }],
        'space-before-bang': [1, { include: false }]
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'BangFormat': { enabled: true, space_after_bang: true, space_before_bang: true }
        }
      }).rules,
      {
        'space-after-bang': [1, { include: true }],
        'space-before-bang': [1, { include: true }]
      }
    );
  });

  it('BemDepth', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'BemDepth': { enabled: true }
        }
      }).rules,
      {
        'bem-depth': 1
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'BemDepth': { enabled: true, max_elements: 3 }
        }
      }).rules,
      {
        'bem-depth': [1, { 'max-depth': 3 }]
      }
    );
  });

  it('BorderZero', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'BorderZero': { enabled: true }
        }
      }).rules,
      {
        'border-zero': 1
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'BorderZero': { enabled: true, convention: 'zero' }
        }
      }).rules,
      {
        'border-zero': [1, { convention: 'zero' }]
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'BorderZero': { enabled: true, convention: 'none' }
        }
      }).rules,
      {
        'border-zero': [1, { convention: 'none' }]
      }
    );
  });

  it('ColorKeyword', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'ColorKeyword': { enabled: true }
        }
      }).rules,
      { 'no-color-keywords': 1 }
    );
  });

  it('ColorVariable', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'ColorVariable': { enabled: true }
        }
      }).rules,
      { 'no-color-literals': 1 }
    );
  });

  it('Comment', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'Comment': { enabled: true }
        }
      }).rules,
      { 'no-css-comments': 1 }
    );
  });

  it('DebugStatement', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'DebugStatement': { enabled: true }
        }
      }).rules,
      { 'no-debug': 1 }
    );
  });

  it('DeclarationOrder', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'DeclarationOrder': { enabled: true }
        }
      }).rules,
      { 'extends-before-declarations': 1, 'extends-before-mixins': 1, 'mixins-before-declarations': 1 }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'DeclarationOrder': { enabled: false }
        }
      }).rules,
      { 'extends-before-declarations': 0, 'extends-before-mixins': 0, 'mixins-before-declarations': 0 }
    );
  });

  it('DuplicateProperty', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'DuplicateProperty': { enabled: true }
        }
      }).rules,
      { 'no-duplicate-properties': 1 }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'DuplicateProperty': { enabled: true, exclude: ['a', 'b', 'c'] }
        }
      }).rules,
      { 'no-duplicate-properties': [1, { exclude: ['a', 'b', 'c'] }] }
    );
  });

  it('EmptyLineBetweenBlocks', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'EmptyLineBetweenBlocks': { enabled: true }
        }
      }).rules,
      { 'empty-line-between-blocks': 1 }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'EmptyLineBetweenBlocks': { enabled: true, ignore_single_line_blocks: true }
        }
      }).rules,
      { 'empty-line-between-blocks': [1, { 'ignore-single-line-rulesets': true }] }
    );
  });

  it('EmptyRule', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'EmptyRule': { enabled: true }
        }
      }).rules,
      { 'no-empty-rulesets': 1 }
    );
  });

  it('ExtendDirective', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'ExtendDirective': { enabled: true }
        }
      }).rules,
      { 'no-extends': 1 }
    );
  });

  it('FinalNewline', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'FinalNewline': { enabled: true }
        }
      }).rules,
      { 'final-newline': 1 }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'FinalNewline': { enabled: true, present: true }
        }
      }).rules,
      { 'final-newline': [1, { include: true }] }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'FinalNewline': { enabled: true, present: false }
        }
      }).rules,
      { 'final-newline': [1, { include: false }] }
    );
  });

  it('HexLength', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'HexLength': { enabled: true }
        }
      }).rules,
      { 'hex-length': 1 }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'HexLength': { enabled: true, style: 'short' }
        }
      }).rules,
      { 'hex-length': [1, { style: 'short' }] }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'HexLength': { enabled: true, style: 'long' }
        }
      }).rules,
      { 'hex-length': [1, { style: 'long' }] }
    );
  });

  it('HexNotation', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'HexNotation': { enabled: true }
        }
      }).rules,
      { 'hex-notation': 1 }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'HexNotation': { enabled: true, style: 'uppercase' }
        }
      }).rules,
      { 'hex-notation': [1, { style: 'uppercase' }] }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'HexNotation': { enabled: true, style: 'lowercase' }
        }
      }).rules,
      { 'hex-notation': [1, { style: 'lowercase' }] }
    );
  });

  it('HexValidation', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'HexValidation': { enabled: true }
        }
      }).rules,
      { 'no-invalid-hex': 1 }
    );
  });

  it('IdSelector', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'IdSelector': { enabled: true }
        }
      }).rules,
      { 'no-ids': 1 }
    );
  });

  it('ImportantRule', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'ImportantRule': { enabled: true }
        }
      }).rules,
      { 'no-important': 1 }
    );
  });

  it('ImportPath', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'ImportPath': { enabled: true }
        }
      }).rules,
      { 'clean-import-paths': 1 }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'ImportPath': { enabled: true, leading_underscore: true }
        }
      }).rules,
      { 'clean-import-paths': [1, { 'leading-underscore': true }] }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'ImportPath': { enabled: true, leading_underscore: false }
        }
      }).rules,
      { 'clean-import-paths': [1, { 'leading-underscore': false }] }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'ImportPath': { enabled: true, filename_extension: true }
        }
      }).rules,
      { 'clean-import-paths': [1, { 'filename-extension': true }] }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'ImportPath': { enabled: true, filename_extension: false }
        }
      }).rules,
      { 'clean-import-paths': [1, { 'filename-extension': false }] }
    );
  });

  it('Indentation', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'Indentation': { enabled: true }
        }
      }).rules,
      { 'indentation': 1 }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'Indentation': { enabled: true, width: 4 }
        }
      }).rules,
      { 'indentation': [1, { size: 4 }] }
    );
  });

  it('LeadingZero', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'LeadingZero': { enabled: true }
        }
      }).rules,
      { 'leading-zero': 1 }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'LeadingZero': { enabled: true, style: 'exclude_zero' }
        }
      }).rules,
      { 'leading-zero': [1, { include: false }] }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'LeadingZero': { enabled: true, style: 'include_zero' }
        }
      }).rules,
      { 'leading-zero': [1, { include: true }] }
    );
  });

  it('MergeableSelector', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'MergeableSelector': { enabled: true }
        }
      }).rules,
      { 'no-mergeable-selectors': 1 }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'MergeableSelector': { enabled: true, force_nesting: true }
        }
      }).rules,
      {
        'force-attribute-nesting': 1,
        'force-element-nesting': 1,
        'force-pseudo-nesting': 1,
        'no-mergeable-selectors': 1
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'MergeableSelector': { enabled: true, force_nesting: false }
        }
      }).rules,
      {
        'force-attribute-nesting': 0,
        'force-element-nesting': 0,
        'force-pseudo-nesting': 0,
        'no-mergeable-selectors': 1
      }
    );
  });

  it('NameFormat', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'NameFormat': { enabled: true }
        }
      }).rules,
      {
        'function-name-format': 1,
        'mixin-name-format': 1,
        'variable-name-format': 1,
        'placeholder-name-format': 1
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'NameFormat': { enabled: true, allow_leading_underscore: true }
        }
      }).rules,
      {
        'function-name-format': [1, { 'allow-leading-underscore': true }],
        'mixin-name-format': [1, { 'allow-leading-underscore': true }],
        'variable-name-format': [1, { 'allow-leading-underscore': true }],
        'placeholder-name-format': [1, { 'allow-leading-underscore': true }]
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'NameFormat': { enabled: true, allow_leading_underscore: false }
        }
      }).rules,
      {
        'function-name-format': [1, { 'allow-leading-underscore': false }],
        'mixin-name-format': [1, { 'allow-leading-underscore': false }],
        'variable-name-format': [1, { 'allow-leading-underscore': false }],
        'placeholder-name-format': [1, { 'allow-leading-underscore': false }]
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'NameFormat': { enabled: true, convention: 'snake_case' }
        }
      }).rules,
      {
        'function-name-format': [1, { convention: 'snakecase' }],
        'mixin-name-format': [1, { convention: 'snakecase' }],
        'variable-name-format': [1, { convention: 'snakecase' }],
        'placeholder-name-format': [1, { convention: 'snakecase' }]
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'NameFormat': { enabled: true, convention: 'camel_case' }
        }
      }).rules,
      {
        'function-name-format': [1, { convention: 'camelcase' }],
        'mixin-name-format': [1, { convention: 'camelcase' }],
        'variable-name-format': [1, { convention: 'camelcase' }],
        'placeholder-name-format': [1, { convention: 'camelcase' }]
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'NameFormat': { enabled: true, convention: 'foo' }
        }
      }).rules,
      {
        'function-name-format': [1, { convention: 'foo' }],
        'mixin-name-format': [1, { convention: 'foo' }],
        'variable-name-format': [1, { convention: 'foo' }],
        'placeholder-name-format': [1, { convention: 'foo' }]
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'NameFormat': { enabled: true, convention_explanation: 'foo' }
        }
      }).rules,
      {
        'function-name-format': [1, { 'convention-explanation': 'foo' }],
        'mixin-name-format': [1, { 'convention-explanation': 'foo' }],
        'variable-name-format': [1, { 'convention-explanation': 'foo' }],
        'placeholder-name-format': [1, { 'convention-explanation': 'foo' }]
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'NameFormat': { enabled: true, function_convention: 'snake_case' }
        }
      }).rules,
      {
        'function-name-format': [1, { convention: 'snakecase' }],
        'mixin-name-format': 1,
        'variable-name-format': 1,
        'placeholder-name-format': 1
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'NameFormat': { enabled: true, mixin_convention: 'snake_case' }
        }
      }).rules,
      {
        'function-name-format': 1,
        'mixin-name-format': [1, { convention: 'snakecase' }],
        'variable-name-format': 1,
        'placeholder-name-format': 1
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'NameFormat': { enabled: true, variable_convention: 'snake_case' }
        }
      }).rules,
      {
        'function-name-format': 1,
        'mixin-name-format': 1,
        'variable-name-format': [1, { convention: 'snakecase' }],
        'placeholder-name-format': 1
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'NameFormat': { enabled: true, placeholder_convention: 'snake_case' }
        }
      }).rules,
      {
        'function-name-format': 1,
        'mixin-name-format': 1,
        'variable-name-format': 1,
        'placeholder-name-format': [1, { convention: 'snakecase' }]
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'NameFormat': { enabled: true, function_convention_explanation: 'foo' }
        }
      }).rules,
      {
        'function-name-format': [1, { 'convention-explanation': 'foo' }],
        'mixin-name-format': 1,
        'variable-name-format': 1,
        'placeholder-name-format': 1
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'NameFormat': { enabled: true, mixin_convention_explanation: 'foo' }
        }
      }).rules,
      {
        'function-name-format': 1,
        'mixin-name-format': [1, { 'convention-explanation': 'foo' }],
        'variable-name-format': 1,
        'placeholder-name-format': 1
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'NameFormat': { enabled: true, variable_convention_explanation: 'foo' }
        }
      }).rules,
      {
        'function-name-format': 1,
        'mixin-name-format': 1,
        'variable-name-format': [1, { 'convention-explanation': 'foo' }],
        'placeholder-name-format': 1
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'NameFormat': { enabled: true, placeholder_convention_explanation: 'foo' }
        }
      }).rules,
      {
        'function-name-format': 1,
        'mixin-name-format': 1,
        'variable-name-format': 1,
        'placeholder-name-format': [1, { 'convention-explanation': 'foo' }]
      }
    );
  });

  it('NestingDepth', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'NestingDepth': { enabled: true }
        }
      }).rules,
      { 'nesting-depth': 1 }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'NestingDepth': { enabled: true, max_depth: 4 }
        }
      }).rules,
      { 'nesting-depth': [1, { 'max-depth': 4 }] }
    );
  });

  it('PlaceholderInExtend', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'PlaceholderInExtend': { enabled: true }
        }
      }).rules,
      { 'placeholder-in-extend': 1 }
    );
  });

  it('PropertySortOrder', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'PropertySortOrder': { enabled: true }
        }
      }).rules,
      { 'property-sort-order': 1 }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'PropertySortOrder': { enabled: true, ignore_unspecified: true }
        }
      }).rules,
      { 'property-sort-order': [1, { 'ignore-custom-properties': true }] }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'PropertySortOrder': { enabled: true, ignore_unspecified: false }
        }
      }).rules,
      { 'property-sort-order': [1, { 'ignore-custom-properties': false }] }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'PropertySortOrder': { enabled: true, order: ['foo', 'bar', 'baz'] }
        }
      }).rules,
      { 'property-sort-order': [1, { order: ['foo', 'bar', 'baz'] }] }
    );
  });

  it('PropertySpelling', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'PropertySpelling': { enabled: true }
        }
      }).rules,
      { 'no-misspelled-properties': 1 }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'PropertySpelling': { enabled: true, extra_properties: ['foo'] }
        }
      }).rules,
      { 'no-misspelled-properties': [1, { 'extra-properties': ['foo'] }] }
    );
  });

  it('PropertyUnits', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'PropertyUnits': { enabled: true }
        }
      }).rules,
      { 'property-units': 1 }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'PropertyUnits': { enabled: true, global: [] }
        }
      }).rules,
      { 'property-units': [1, { global: [] }] }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'PropertyUnits': { enabled: true, global: ['px'] }
        }
      }).rules,
      { 'property-units': [1, { global: ['px'] }] }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'PropertyUnits': { enabled: true, properties: { width: ['px'] } }
        }
      }).rules,
      { 'property-units': [1, { 'per-property': { width: ['px'] } }] }
    );
  });

  it('QualifyingElement', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'QualifyingElement': { enabled: true }
        }
      }).rules,
      { 'no-qualifying-elements': 1 }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'QualifyingElement': {
            enabled: true,
            allow_element_with_attribute: true,
            allow_element_with_class: true,
            allow_element_with_id: true
          }
        }
      }).rules,
      {
        'no-qualifying-elements': [1, {
          'allow-element-with-attribute': true,
          'allow-element-with-class': true,
          'allow-element-with-id': true
        }]
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'QualifyingElement': {
            enabled: true,
            allow_element_with_attribute: false,
            allow_element_with_class: false,
            allow_element_with_id: false
          }
        }
      }).rules,
      {
        'no-qualifying-elements': [1, {
          'allow-element-with-attribute': false,
          'allow-element-with-class': false,
          'allow-element-with-id': false
        }]
      }
    );
  });

  it('SelectorFormat', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SelectorFormat': { enabled: true }
        }
      }).rules,
      {
        // 'attribute-name-format': 1,
        'class-name-format': 1,
        // 'element-name-format': 1,
        'id-name-format': 1,
        'placeholder-name-format': 1
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SelectorFormat': { enabled: true, allow_leading_underscore: true }
        }
      }).rules,
      {
        // 'attribute-name-format': [1, { 'allow-leading-underscore': true }],
        'class-name-format': [1, { 'allow-leading-underscore': true }],
        // 'element-name-format': [1, { 'allow-leading-underscore': true }],
        'id-name-format': [1, { 'allow-leading-underscore': true }],
        'placeholder-name-format': [1, { 'allow-leading-underscore': true }]
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SelectorFormat': { enabled: true, allow_leading_underscore: false }
        }
      }).rules,
      {
        // 'attribute-name-format': [1, { 'allow-leading-underscore': false }],
        'class-name-format': [1, { 'allow-leading-underscore': false }],
        // 'element-name-format': [1, { 'allow-leading-underscore': false }],
        'id-name-format': [1, { 'allow-leading-underscore': false }],
        'placeholder-name-format': [1, { 'allow-leading-underscore': false }]
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SelectorFormat': { enabled: true, ignored_names: ['foo'] }
        }
      }).rules,
      {
        // 'attribute-name-format': [1, { 'ignore': ['foo'] }],
        'class-name-format': [1, { 'ignore': ['foo'] }],
        // 'element-name-format': [1, { 'ignore': ['foo'] }],
        'id-name-format': [1, { 'ignore': ['foo'] }],
        'placeholder-name-format': [1, { 'ignore': ['foo'] }]
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SelectorFormat': { enabled: true, convention: 'snake_case' }
        }
      }).rules,
      {
        // 'attribute-name-format': [1, { convention: 'snakecase' }],
        'class-name-format': [1, { convention: 'snakecase' }],
        // 'element-name-format': [1, { convention: 'snakecase' }],
        'id-name-format': [1, { convention: 'snakecase' }],
        'placeholder-name-format': [1, { convention: 'snakecase' }]
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SelectorFormat': { enabled: true, convention: 'camel_case' }
        }
      }).rules,
      {
        // 'attribute-name-format': [1, { convention: 'camelcase' }],
        'class-name-format': [1, { convention: 'camelcase' }],
        // 'element-name-format': [1, { convention: 'camelcase' }],
        'id-name-format': [1, { convention: 'camelcase' }],
        'placeholder-name-format': [1, { convention: 'camelcase' }]
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SelectorFormat': { enabled: true, convention: 'strict_BEM' }
        }
      }).rules,
      {
        // 'attribute-name-format': [1, { convention: 'strictbem' }],
        'class-name-format': [1, { convention: 'strictbem' }],
        // 'element-name-format': [1, { convention: 'strictbem' }],
        'id-name-format': [1, { convention: 'strictbem' }],
        'placeholder-name-format': [1, { convention: 'strictbem' }]
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SelectorFormat': { enabled: true, convention: 'hyphenated_BEM' }
        }
      }).rules,
      {
        // 'attribute-name-format': [1, { convention: 'hyphenatedbem' }],
        'class-name-format': [1, { convention: 'hyphenatedbem' }],
        // 'element-name-format': [1, { convention: 'hyphenatedbem' }],
        'id-name-format': [1, { convention: 'hyphenatedbem' }],
        'placeholder-name-format': [1, { convention: 'hyphenatedbem' }]
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SelectorFormat': { enabled: true, convention: 'foo' }
        }
      }).rules,
      {
        // 'attribute-name-format': [1, { convention: 'foo' }],
        'class-name-format': [1, { convention: 'foo' }],
        // 'element-name-format': [1, { convention: 'foo' }],
        'id-name-format': [1, { convention: 'foo' }],
        'placeholder-name-format': [1, { convention: 'foo' }]
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SelectorFormat': { enabled: true, convention_explanation: 'foo' }
        }
      }).rules,
      {
        // 'attribute-name-format': [1, { 'convention-explanation': 'foo' }],
        'class-name-format': [1, { 'convention-explanation': 'foo' }],
        // 'element-name-format': [1, { 'convention-explanation': 'foo' }],
        'id-name-format': [1, { 'convention-explanation': 'foo' }],
        'placeholder-name-format': [1, { 'convention-explanation': 'foo' }]
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SelectorFormat': { enabled: true, attribute_convention: 'snake_case' }
        }
      }).rules,
      {
        // 'attribute-name-format': [1, { convention: 'snakecase' }],
        'class-name-format': 1,
        // 'element-name-format': 1,
        'id-name-format': 1,
        'placeholder-name-format': 1
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SelectorFormat': { enabled: true, class_convention: 'snake_case' }
        }
      }).rules,
      {
        // 'attribute-name-format': 1,
        'class-name-format': [1, { convention: 'snakecase' }],
        // 'element-name-format': 1,
        'id-name-format': 1,
        'placeholder-name-format': 1
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SelectorFormat': { enabled: true, element_convention: 'snake_case' }
        }
      }).rules,
      {
        // 'attribute-name-format': 1,
        'class-name-format': 1,
        // 'element-name-format': [1, { convention: 'snakecase' }],
        'id-name-format': 1,
        'placeholder-name-format': 1
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SelectorFormat': { enabled: true, id_convention: 'snake_case' }
        }
      }).rules,
      {
        // 'attribute-name-format': 1,
        'class-name-format': 1,
        // 'element-name-format': 1,
        'id-name-format': [1, { convention: 'snakecase' }],
        'placeholder-name-format': 1
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SelectorFormat': { enabled: true, placeholder_convention: 'snake_case' }
        }
      }).rules,
      {
        // 'attribute-name-format': 1,
        'class-name-format': 1,
        // 'element-name-format': 1,
        'id-name-format': 1,
        'placeholder-name-format': [1, { convention: 'snakecase' }]
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SelectorFormat': { enabled: true, attribute_convention_explanation: 'foo' }
        }
      }).rules,
      {
        // 'attribute-name-format': [1, { 'convention-explanation': 'foo' }],
        'class-name-format': 1,
        // 'element-name-format': 1,
        'id-name-format': 1,
        'placeholder-name-format': 1
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SelectorFormat': { enabled: true, class_convention_explanation: 'foo' }
        }
      }).rules,
      {
        // 'attribute-name-format': 1,
        'class-name-format': [1, { 'convention-explanation': 'foo' }],
        // 'element-name-format': 1,
        'id-name-format': 1,
        'placeholder-name-format': 1
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SelectorFormat': { enabled: true, element_convention_explanation: 'foo' }
        }
      }).rules,
      {
        // 'attribute-name-format': 1,
        'class-name-format': 1,
        // 'element-name-format': [1, { 'convention-explanation': 'foo' }],
        'id-name-format': 1,
        'placeholder-name-format': 1
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SelectorFormat': { enabled: true, id_convention_explanation: 'foo' }
        }
      }).rules,
      {
        // 'attribute-name-format': 1,
        'class-name-format': 1,
        // 'element-name-format': 1,
        'id-name-format': [1, { 'convention-explanation': 'foo' }],
        'placeholder-name-format': 1
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SelectorFormat': { enabled: true, placeholder_convention_explanation: 'foo' }
        }
      }).rules,
      {
        // 'attribute-name-format': 1,
        'class-name-format': 1,
        // 'element-name-format': 1,
        'id-name-format': 1,
        'placeholder-name-format': [1, { 'convention-explanation': 'foo' }]
      }
    );
  });

  it('Shorthand', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'Shorthand': { enabled: true }
        }
      }).rules,
      { 'shorthand-values': 1 }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'Shorthand': { enabled: true, allowed_shorthands: [1, 2, 3] }
        }
      }).rules,
      {
        'shorthand-values': [1, { 'allowed-shorthands': [1, 2, 3] }]
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'Shorthand': { enabled: true, allowed_shorthands: [1, 3] }
        }
      }).rules,
      {
        'shorthand-values': [1, { 'allowed-shorthands': [1, 3] }]
      }
    );
  });

  // Missing: SingleLinePerProperty

  it('SingleLinePerSelector', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SingleLinePerSelector': { enabled: true }
        }
      }).rules,
      { 'single-line-per-selector': 1 }
    );
  });

  it('SpaceAfterComma', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SpaceAfterComma': { enabled: true }
        }
      }).rules,
      { 'space-after-comma': 1 }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SpaceAfterComma': { enabled: true, style: 'one_space' }
        }
      }).rules,
      { 'space-after-comma': [1, { include: true }] }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SpaceAfterComma': { enabled: true, style: 'no_space' }
        }
      }).rules,
      { 'space-after-comma': [1, { include: false }] }
    );
  });

  it('SpaceAfterPropertyColon', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SpaceAfterPropertyColon': { enabled: true }
        }
      }).rules,
      { 'space-after-colon': 1 }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SpaceAfterPropertyColon': { enabled: true, style: 'one_space' }
        }
      }).rules,
      { 'space-after-colon': [1, { include: true }] }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SpaceAfterPropertyColon': { enabled: true, style: 'no_space' }
        }
      }).rules,
      { 'space-after-colon': [1, { include: false }] }
    );
  });

  it('SpaceAfterPropertyName', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SpaceAfterPropertyName': { enabled: true }
        }
      }).rules,
      { 'space-before-colon': 1 }
    );
  });

  it('SpaceAfterVariableName', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SpaceAfterVariableName': { enabled: true }
        }
      }).rules,
      { 'space-before-colon': 1 }
    );
  });

  it('SpaceBeforeBrace', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SpaceBeforeBrace': { enabled: true }
        }
      }).rules,
      { 'space-before-brace': 1 }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SpaceBeforeBrace': { enabled: true, style: 'space' }
        }
      }).rules,
      { 'space-before-brace': [1, { include: true }] }
    );

    var convertWarnings = scss2sass.convert(
        {
          linters: {
            'SpaceBeforeBrace': { enabled: true, style: 'new_line' }
          }
        },
        {
          debug: true
        }
      ).warnings;

    assert.equal(convertWarnings.length, 1);
    assert.notEqual(convertWarnings[0].indexOf('style'), -1);
    assert.notEqual(convertWarnings[0].indexOf('new_line'), -1);
  });

  it('SpaceBetweenParens', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SpaceBetweenParens': { enabled: true }
        }
      }).rules,
      { 'space-between-parens': 1 }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SpaceBetweenParens': { enabled: true, spaces: 0 }
        }
      }).rules,
      { 'space-between-parens': [1, { include: false }] }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'SpaceBetweenParens': { enabled: true, spaces: 1 }
        }
      }).rules,
      { 'space-between-parens': [1, { include: true }] }
    );

    assert.equal(
      scss2sass.convert({
        linters: {
          'SpaceBetweenParens': { enabled: true, spaces: 2 }
        }
      }, { debug: true }).warnings.length,
      1
    );
  });

  it('StringQuotes', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'StringQuotes': { enabled: true }
        }
      }).rules,
      { 'quotes': 1 }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'StringQuotes': { enabled: true, style: 'single_quotes' }
        }
      }).rules,
      { 'quotes': [1, { style: 'single' }] }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'StringQuotes': { enabled: true, style: 'double_quotes' }
        }
      }).rules,
      { 'quotes': [1, { style: 'double' }] }
    );
  });

  it('TrailingSemicolon', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'TrailingSemicolon': { enabled: true }
        }
      }).rules,
      { 'trailing-semicolon': 1 }
    );
  });

  it('TrailingZero', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'TrailingZero': { enabled: true }
        }
      }).rules,
      { 'no-trailing-zero': 1 }
    );
  });

  it('TransitionAll', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'TransitionAll': { enabled: true }
        }
      }).rules,
      { 'no-transition-all': 1 }
    );
  });

  it('UnnecessaryMantissa', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'UnnecessaryMantissa': { enabled: true }
        }
      }).rules,
      { 'no-trailing-zero': 1 }
    );
  });

  it('UrlFormat', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'UrlFormat': { enabled: true }
        }
      }).rules,
      { 'no-url-protocols': 1 }
    );
  });

  it('UrlQuotes', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'UrlQuotes': { enabled: true }
        }
      }).rules,
      { 'url-quotes': 1 }
    );
  });

  it('VariableForProperty', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'VariableForProperty': { enabled: true }
        }
      }).rules,
      { 'variable-for-property': 1 }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'VariableForProperty': { enabled: true, properties: ['foo', 'bar', 'baz'] }
        }
      }).rules,
      { 'variable-for-property': [1, { properties: ['foo', 'bar', 'baz'] }] }
    );
  });

  it('VendorPrefix', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'VendorPrefix': { enabled: true }
        }
      }).rules,
      { 'no-vendor-prefixes': 1 }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'VendorPrefix': {
            enabled: true,
            additional_identifiers: ['a', 'b', 'c'],
            excluded_identifiers: ['d', 'e', 'f']
          }
        }
      }).rules,
      {
        'no-vendor-prefixes': [
          1,
          {
            'additional-identifiers': ['a', 'b', 'c'],
            'excluded-identifiers': ['d', 'e', 'f']
          }
        ]
      }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'VendorPrefix': {
            enabled: true,
            additional_identifiers: []
          }
        }
      }).rules,
      { 'no-vendor-prefixes': [1, { 'additional-identifiers': [] }] }
    );

    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'VendorPrefix': {
            enabled: true,
            excluded_identifiers: []
          }
        }
      }).rules,
      { 'no-vendor-prefixes': [1, { 'excluded-identifiers': [] }] }
    );
  });

  it('ZeroUnit', function () {
    assert.deepStrictEqual(
      scss2sass.convert({
        linters: {
          'ZeroUnit': { enabled: true }
        }
      }).rules,
      { 'zero-unit': 1 }
    );
  });
});
