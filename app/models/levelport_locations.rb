module LevelportLocations
  def self.all cookies:
    setup cookies
    cookies.permanent[:level_codes].split('&')
  end

  def self.create code:, cookies:
    setup cookies
    old_codes = all cookies: cookies
    cookies.permanent[:level_codes] = ( old_codes + [ code ] ).uniq
  end

  def self.setup cookies
    cookies.permanent[:level_codes] ||= ''
  end
end
