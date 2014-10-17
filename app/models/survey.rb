class Survey < ActiveRecord::Base
  has_many :questions
  has_many :relationships
  has_many :users, through: :relationships
end
