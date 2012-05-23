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
    return Net::DNS::Resolver.start(IPSocket::getaddress(domain), Net::DNS::PTR).to_s.include? 'heroku'
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