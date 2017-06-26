describe('Search Users', function(){
    var searchButton;

    beforeEach(function(){
            browser.get('http://localhost:3000');
            searchButton = element(by.id('searchButton'));
    });
    
    it('the page title should be User Search', function(){   
        expect(browser.getTitle()).toEqual('User Search');
    });

    it('search button should be available', function(){
        expect(searchButton.isPresent()).toBe(true);
    });

    it('the button text should be Search Users', function(){

        expect(searchButton.getText()).toEqual('Search Users');
    });
});
