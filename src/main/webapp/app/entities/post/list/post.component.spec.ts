import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PostService } from '../service/post.service';

import { PostComponent } from './post.component';

describe('Component Tests', () => {
  describe('Post Management Component', () => {
    let comp: PostComponent;
    let fixture: ComponentFixture<PostComponent>;
    let service: PostService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PostComponent],
      })
        .overrideTemplate(PostComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PostComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(PostService);

      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.posts?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
