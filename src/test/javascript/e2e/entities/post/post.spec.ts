import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PostComponentsPage, PostDeleteDialog, PostUpdatePage } from './post.page-object';

const expect = chai.expect;

describe('Post e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let postComponentsPage: PostComponentsPage;
  let postUpdatePage: PostUpdatePage;
  let postDeleteDialog: PostDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Posts', async () => {
    await navBarPage.goToEntity('post');
    postComponentsPage = new PostComponentsPage();
    await browser.wait(ec.visibilityOf(postComponentsPage.title), 5000);
    expect(await postComponentsPage.getTitle()).to.eq('Posts');
    await browser.wait(ec.or(ec.visibilityOf(postComponentsPage.entities), ec.visibilityOf(postComponentsPage.noResult)), 1000);
  });

  it('should load create Post page', async () => {
    await postComponentsPage.clickOnCreateButton();
    postUpdatePage = new PostUpdatePage();
    expect(await postUpdatePage.getPageTitle()).to.eq('Create or edit a Post');
    await postUpdatePage.cancel();
  });

  it('should create and save Posts', async () => {
    const nbButtonsBeforeCreate = await postComponentsPage.countDeleteButtons();

    await postComponentsPage.clickOnCreateButton();

    await promise.all([postUpdatePage.setUserIdInput('5'), postUpdatePage.setTitleInput('title'), postUpdatePage.setBodyInput('body')]);

    expect(await postUpdatePage.getUserIdInput()).to.eq('5', 'Expected userId value to be equals to 5');
    expect(await postUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await postUpdatePage.getBodyInput()).to.eq('body', 'Expected Body value to be equals to body');

    await postUpdatePage.save();
    expect(await postUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await postComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Post', async () => {
    const nbButtonsBeforeDelete = await postComponentsPage.countDeleteButtons();
    await postComponentsPage.clickOnLastDeleteButton();

    postDeleteDialog = new PostDeleteDialog();
    expect(await postDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Post?');
    await postDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(postComponentsPage.title), 5000);

    expect(await postComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
