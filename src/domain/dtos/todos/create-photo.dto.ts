export class CreatePhotoDto {


    private constructor(public readonly title: string) {}
  
    static create(props: { [key: string]: any }): [string?, CreatePhotoDto?] {
      const { title, id, url } = props;
  
      if (!title) return ["Titulo es requerido", undefined];
  
      return [undefined, new CreatePhotoDto(title)];
    }
  
    
  }
  