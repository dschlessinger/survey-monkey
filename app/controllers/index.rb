configure do
  enable :sessions
end

get '/' do
	if logged_in?
		@surveys = Survey.all
	end
	erb :index
end

get '/survey/new' do
	200
end

get '/view/survey/:id' do
	@survey = Survey.find(params[:id])
	erb :_display_survey
end

post '/survey/new' do
	content_type :json
	survey = Survey.create(params)
	author = User.find_by_username(params[:author_username])
	{title: survey.title, survey_id: survey.id, author: author.username}.to_json
end

post '/question/new' do
	content_type :json
	question = Question.create(params)
	Survey.find(params[:survey_id]).questions << question
	return {question_id: question.id}.to_json
end

post '/choice/new' do
	content_type :json
	choice = Choice.create(params)
	Question.find(params[:question_id]).choices << choice
	return {question_id: choice.question_id}.to_json
end

post '/anotherquestion' do
	content_type :json
	return {question_id: (params[:question_id] + 1)}.to_json
end
# ------------------------------

get '/sessions/new' do
  erb :sign_in
end

post '/sessions' do
	# content_type :json
	@user = User.find_by_username(params[:username])
  if @user.password == params[:password]
  	# p "*"*100
  	# p "success"
    session[:user_id] = @user.id
		# @user
	# else
	# 	{"message" => "Error occurred."}.to_json
  end
  redirect '/'
end

delete '/sessions/:id' do
  session.clear
  redirect '/'
end

#----------- USERS -----------

get '/users/new' do
  erb :sign_up
end

post '/users' do
  create
  redirect '/'
end

private

def create
  @user = User.new(params[:user])
  @user.password = params[:password]
  @user.save
end

# post '/note' do
# 	@note = Note.create(params)
# 	redirect "/note/#{@note.id}"
# end

# get '/note/:id' do
# 	@note = Note.find(params[:id])
# 	erb :show_note
# end

# get '/note/:id/edit' do
# 	@note = Note.find(params[:id])
# 	erb :edit_note
# end

# put '/note/:id' do
# 	@note = Note.find(params[:id])
# 	@note.assign_attributes({
# 	  title: params[:title],
# 	  content: params[:content],
# 	  updated_at: params[:updated_at],
# 	  author: params[:author]
# 	  })
# 	@note.save
# 	redirect "/note/#{@note.id}"
# end

# get '/note/:id/delete' do
# 	@note = Note.find(params[:id])
# 	@note.destroy!
# 	redirect '/'
# end
