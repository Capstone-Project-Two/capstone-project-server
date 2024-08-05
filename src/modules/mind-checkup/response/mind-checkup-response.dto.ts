type TResponse = 'Yes' | 'No' | 'Maybe';

// Does not need to extend base response
export class MindCheckupResponseDto {
  'is_have_mental_issues': TResponse;
}
