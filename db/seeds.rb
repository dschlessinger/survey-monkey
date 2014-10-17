require 'faker'
require 'date'

25.times { Survey.create(title: Faker::Company.catch_phrase, description: Faker::Lorem.sentence, author_username: Faker::Internet.user_name, updated_at: (Date.today-rand(10)) ) }