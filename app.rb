require 'sinatra'
require 'net/dns'
require 'socket'
require 'json'

set :public_folder, Proc.new {
  p = 'public'
  p += '/build/testing' if ENV['RACK_ENV'] == 'production'
  File.join(File.dirname(__FILE__), p)
}

def built_on_heroku(domain)
  begin
    return true if ['75.101.163.44', '75.101.145.87', '174.129.212.2'].include? IPSocket::getaddress(domain)
    return Net::DNS::Resolver.start(domain, Net::DNS::PTR).to_s.include? 'heroku'
  rescue
    return nil
  end
end

get '/' do
  send_file Sinatra::Application.public_folder + '/index.html'
end

post '/' do
  content_type :json
  { :success => built_on_heroku(params[:domain]) }.to_json
end