module CodeGenerator
  def self.code
    SecureRandom.hex.first 7
  end
end
