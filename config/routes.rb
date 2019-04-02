Rails.application.routes.draw do
  root 'static#splash'
  get 'play', to: 'static#play'
  get 'about', to: 'static#about'
  get 'instructions', to: 'static#instructions'
  get 'contact', to: 'static#contact'
  get 'privacy', to: 'static#privacy'
  get 'gameover', to: 'static#gameover'
  get 'level_code/:id', to: 'level_codes#show'
  get 'levelport_locations/create'
  get '/poppixie', to: redirect('https://12joan.github.io/pop-pixie-online/')
end
