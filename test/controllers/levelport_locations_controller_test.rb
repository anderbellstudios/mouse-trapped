require 'test_helper'

class LevelportLocationsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get levelport_locations_create_url
    assert_response :success
  end

end
