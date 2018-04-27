class LevelCode < ApplicationRecord
  def self.find_level_for code
    LevelCode.find_by(code: code.downcase.strip)
  end
end
