# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

level_codes = [
  ['01', 'mouse'],
  ['02', 'cat'],
  ['04', 'button'],
  ['05', 'scientist'],
  ['06', 'doors'],
  ['07', 'hidden'],
  ['08', 'escape'],
  ['09', 'hide'],
  ['0a', 'run'],
  ['0b', 'shadow'],
  ['0c', 'cycle'],
  ['0d', 'pathfinder'],
  ['0e', 'holes'],
  ['0f', 'friend'],
  ['10', 'multiple'],
  ['11', 'traps'],
  ['12', 'slow'],
  ['14', 'telsas'],
  ['15', 'gap'],
  ['16', 'gate'],
  ['1e', 'maze'],
  ['1f', 'buttons'],
  ['20', 'endings']
]

level_codes.each { |lc|
  LevelCode.create level: lc[0], code: lc[1]
}
