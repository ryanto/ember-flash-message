namespace :plugin do
  desc "build a new version"
  task :build do
    sh "bundle exec rakep build"
    sh "cp ./compiled/flash-message.js ./flash-message.js"
  end

  desc "clean it all"
  task :clean do
    sh "rm -rf ./tmp"
    sh "rm -rf ./compiled"
  end
end
