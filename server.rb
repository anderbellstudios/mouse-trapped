require 'sinatra'

class MouseTrapped < Sinatra::Base
  def self.route_page(page, args={})
    path = args[:from] || ( "/" + page.to_s )
    template = args[:template]

    get path do
      erb :main, layout: false do
        if template.nil? then
          erb page.to_sym
        else
          erb page.to_sym, layout: template.to_sym
        end
      end
    end
  end

  route_page(:splash, from: '/', template: :interactive)
  route_page(:play, template: :interactive)
  route_page(:about, template: :info)
  route_page(:instructions, template: :info)
  route_page(:contact, template: :info)

  get '/videos/interlevel.mp4' do
    file = File.join('videos', 'interlevel.mp4')
    send_file(file)
  end
end
