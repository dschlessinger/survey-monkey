class User < ActiveRecord::Base
	validates_uniqueness_of :username
	validates_presence_of :username, :password
	has_many :relationships
  	has_many :surveys, through: :relationships
end

# A survey can have many users (they are the people who answer it)
# BUT...a user can have many surveys (they are the surveys they fill out)